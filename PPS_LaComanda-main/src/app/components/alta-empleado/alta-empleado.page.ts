import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { uploadString } from 'firebase/storage';
import { Empleado } from 'src/app/interfaces/empleado';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ScannerService } from 'src/app/services/scanner.service';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';


@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.page.html',
  styleUrls: ['./alta-empleado.page.scss'],
})
export class AltaEmpleadoPage implements OnInit {
  perfil : string;
  form : FormGroup;
  empleado : Empleado;
  foto : any;
  capturedPhoto : any = "";
  url : any = "";
  storage : any;
  fotoSubida : boolean = false;
  webPath : string = "";
  slideMetre : boolean = false;
  slideMozo : boolean = false;
  slideCocinero : boolean = false;
  slideBartender : boolean = false;

  constructor(private formBuilder : FormBuilder, private fs : FirestoreService, public as : AuthService, private router : Router,private sf : ScannerService, private imageStore : ImagenesService) 
  { 
    this.form = this.formBuilder.group({
      'nombre' : ['',[Validators.required,Validators.minLength(2)]],
      'apellido' : ['',[Validators.required,Validators.minLength(2)]],
      'dni' : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      'cuil': ['',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
      'email': ['',[Validators.required,Validators.email]],
      'password': ['',[Validators.required,Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  altaEmpleado()
  {
    this.as.loading = true;
       
    this.fs.agregarEmpleado(this.empleado);

    this.as.registro(this.empleado);

    setTimeout(() => {
        this.form.reset(); 
        this.fotoSubida = false;
        this.as.loading = false;
        this.webPath = "";
        this.slideMetre = false;
        this.slideMozo = false;
        this.slideCocinero = false;
        this.slideBartender = false;
      }, 2500);

  }

  agregarFoto()
  { 
    this.empleado = {
      email: this.form.get('email')?.value,
      clave: this.form.get('password')?.value,
      nombre : this.form.get('nombre')?.value,
      apellido : this.form.get('apellido')?.value,
      DNI : this.form.get('dni')?.value,
      CUIL: this.form.get('cuil')?.value,
      perfil: this.perfil,
      foto : "",
      encuesta : null
    };
    this.imageStore.addNewToGallery(this.empleado).then((data) =>{
      this.as.loading = true;
      this.storage = data.storage;
      this.url = data.url;
      this.capturedPhoto = data.capturedPhoto;
      this.fotoSubida = true;
      uploadString(this.storage,this.capturedPhoto.dataUrl, 'data_url').then((data) =>{    
        this.url.getDownloadURL().subscribe((url1 : any)=>{
          this.webPath = url1;
          this.empleado.foto = url1;
          setTimeout(() => {
            this.as.loading = false;
          }, 2000);
        });
      });
    });

  }

  leerDNI()
  {
    let datos : any = [];
    let nombre : string;
    let apellido : string;
    let nombreFinal : string;
    let apellidoFinal : string;
    let cuilFinal : number;
    this.sf.test().then((data) => {
      
      datos = data.split('@');
      nombre = datos[2];
      apellido = datos[1];
      nombreFinal = nombre[0];
      apellidoFinal = apellido[0];
      cuilFinal = (datos[7])[0] + (datos[7])[1] + datos[4] + (datos[7])[2];
      
      for(let i = 1; i < nombre.length; i++)
      {
        if(nombre[i-1] == " ")
        {
          nombreFinal = nombreFinal + nombre[i].toUpperCase();
        }
        else
        {
          nombreFinal = nombreFinal + nombre[i].toLowerCase();
        }

      }

      for(let i = 1; i < apellido.length; i++)
      {
        if(apellido[i-1] == " ")
        {
          apellidoFinal = apellidoFinal + apellido[i].toUpperCase();
        }
        else
        {
          apellidoFinal = apellidoFinal + apellido[i].toLowerCase();
        }
      }


      this.form.get('apellido')?.setValue(apellidoFinal);
      this.form.get('nombre')?.setValue(nombreFinal);
      this.form.get('dni')?.setValue(datos[4]);
      this.form.get('cuil')?.setValue(cuilFinal);
      this.sf.stopScan();
    })
  }

  onChangeMetre(ob: MatSlideToggleChange) {
    if(ob.checked){
      this.slideMetre = true;
      this.slideMozo = false;
      this.slideCocinero = false;
      this.slideBartender = false;
      this.perfil = 'Metre';
    }else{
      this.slideMetre = false;
      this.perfil = '';
    }
  }

  onChangeMozo(ob: MatSlideToggleChange) {

    if(ob.checked){
      this.slideMetre = false;
      this.slideMozo = true;
      this.slideCocinero = false;
      this.slideBartender = false;
      this.perfil = 'Mozo';
    }else{
      this.slideMozo = false;
      this.perfil = '';
    }
  }

  onChangeCocinero(ob: MatSlideToggleChange) {
    if(ob.checked){
      this.slideMetre = false;
      this.slideMozo = false;
      this.slideCocinero = true;
      this.slideBartender = false;
      this.perfil = 'Cocinero';
    }else{
      this.slideCocinero = false;
      this.perfil = '';
    }
  }

  onChangeBartender(ob: MatSlideToggleChange) {
    if(ob.checked){
      this.slideMetre = false;
      this.slideMozo = false;
      this.slideCocinero = false;
      this.slideBartender = true;
      this.perfil = 'Bartender';
    }else{
      this.slideBartender = false;
      this.perfil = '';
    }
  }

}
