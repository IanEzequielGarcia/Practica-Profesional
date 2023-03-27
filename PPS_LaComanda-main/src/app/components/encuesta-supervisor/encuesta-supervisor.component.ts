import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { uploadString } from 'firebase/storage';
import { DuenSup } from 'src/app/interfaces/duen-sup';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ScannerService } from 'src/app/services/scanner.service';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-encuesta-supervisor',
  templateUrl: './encuesta-supervisor.component.html',
  styleUrls: ['./encuesta-supervisor.component.scss'],
})
export class EncuestaSupervisorComponent implements OnInit {

  form : FormGroup;
  range:any;
  radio : any;
  checkbox : any;
  menu : any;
  uno : boolean;
  dos : boolean;
  masdetres : boolean;
  selectedUser:any;
  listaUsuarios:any = [];
  listaDisponible:any = [];
  constructor(private formBuilder : FormBuilder, public fs : FirestoreService, public as : AuthService, private router : Router,private sf : ScannerService, private imageStore : ImagenesService, private toast : ToastController) 
  { 
    this.form = this.formBuilder.group({
      'input' : ['',[Validators.required,Validators.minLength(2), Validators.maxLength(2)]],
    });
    this.fs.traerUsuarios().subscribe(res=>{
      this.listaUsuarios = res;
      this.listaUsuarios.forEach(usuario => {
        if(usuario.perfil != 'Dueño' && usuario.perfil != 'Supervisor'){
          this.listaDisponible.push(usuario);
        }
      });
    });
  }

  ngOnInit() {
    
  }
  elegirUsuario(e) {
    let userName = e.target.value;
    this.listaDisponible.forEach(usuario=>{
      if(userName == usuario.nombre){
        this.selectedUser = usuario;
      }
    })
  }

  enviarEncuesta(){
    let respuesta = {
      pregunta1: this.range,
      pregunta2:this.form.get('input')?.value,
      pregunta3:this.radio,
      pregunta4:this.checkbox,
      pregunta5:this.menu,
    }

    this.as.loading = true;
    this.fs.agregarEncuestaSupervisor(respuesta);
    
    setTimeout(() => {
      this.as.loading = false;
      if(this.fs.sonido){
      this.reproducirSonido("audioBueno2");
      }
      this.MostrarToast("La encuesta ha sido cargada con exito").then((toast : any) =>{
        toast.present();
      });
      this.range = 0;
      this.radio = "Nada";
      this.menu = "Elegir";
      this.uno =false;
      this.dos =false;
      this.masdetres =false;
      this.checkbox = "";
    }, 3000);

    this.MostrarToast('Encuesta enviada.').then((toast : any )=>{
      toast.present();
      console.log(respuesta);
    });

  }

  reproducirSonido(dato : string)
  {
    let ruta : string = '../../../assets/sonidos/';
    let nombreArchivo : string = "";
    let audioNombre : string = "";

    audioNombre = dato + ".mp3"; 
    nombreArchivo = ruta + audioNombre;

    this.reproducir(nombreArchivo);
           
  }

  reproducir(ruta : string)
  {
    let audio = new Audio(ruta);
    audio.play();   
  }

  capturarRespuesta(event: any){
    this.range = event.detail.value;
  }
  respuestaRadioGroup(event: any){   
    switch (event.value) {
      case "1":        
        this.radio = "Poco";
        break;
      case "2":        
        this.radio = "Mas o menos";
        break;
      case "3":        
        this.radio = "Mucho";
        break;
      default:
        this.radio = "";
      break;
    } 
  }

  onValorCapturadoCheck(value: any){
    switch(value){
      case 1 : 
        this.uno = false;
        this.dos = false;
        this.masdetres = false;
        this.checkbox = "1";
      break;
      case 2:
        this.uno = false;
        this.dos = false;
        this.masdetres = false;
        this.checkbox = "2";
        break
      case 3: 
        this.uno = false;
        this.dos = false;
        this.masdetres = false;
        this.checkbox = "mas de 3";
        break
    }
  }

  cargarRespuestaMenu(value : any){
    switch (value) {
      case 1:        
        document.getElementById("respuesta").setAttribute('value',"Resto");
        this.menu = "Resto";
        break;
      case 2:
        document.getElementById("respuesta").setAttribute('value',"Bar");
        this.menu = "Bar";
        break;
      case 3:
        document.getElementById("respuesta").setAttribute('value',"Ninguna");
        this.menu = "Ninguna";
        break;
    }  
  }

  MostrarToast(message : string)
  {
    return this.toast.create({
            header: 'Exito',
            message: message,
            buttons: ['Ok'],
            position: 'top',
            color: 'success'
    });
  }

}
