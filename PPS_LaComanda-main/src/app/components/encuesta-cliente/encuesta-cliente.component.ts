import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ToastController } from '@ionic/angular';
import { PushService } from 'src/app/services/push.service';

@Component({
  selector: 'app-encuesta-cliente',
  templateUrl: './encuesta-cliente.component.html',
  styleUrls: ['./encuesta-cliente.component.scss'],
})
export class EncuestaClienteComponent implements OnInit {

  @Output() volverEvent = new EventEmitter<boolean>();
  respuestaAutoCompletada : string;
  respuestaRange : any = 0;
  respuestaRadio : string = "";
  respuestaRadio2 : string = "";
  siCheckBox : boolean;
  noCheckBox : boolean;
  momCheckBox : boolean;
  respuestaCheck : string = "";
  respuestaMenu : string = "Elegir";

  respuesta1 : boolean = false;
  respuesta2 : boolean = false;
  respuesta3 : boolean = true;
  respuesta4 : boolean = false;
  respuesta5 : boolean = false;

  posibleAgregar : boolean = false;

  constructor(public as : AuthService, private fs : FirestoreService, private toastController : ToastController,private push : PushService) 
  {
   
  }

  ngOnInit() {

  }

  autoCompletar()
  {
    let aComparar : any = this.respuestaAutoCompletada[0];
    if(aComparar == "s" || aComparar == "S")
    {
      this.respuestaAutoCompletada = "Si";

      this.respuesta2 = true;
      this.habilitarBoton();
    }
    else
    {
      if(aComparar != "" && aComparar != undefined)
      {
        console.log(this.respuestaAutoCompletada);
        console.log(aComparar);
        this.respuestaAutoCompletada = "";
        this.respuestaAutoCompletada = "No";
        console.log(this.respuestaAutoCompletada);
        this.respuesta2 = true;
        this.habilitarBoton();
      }
      else
      {
        console.log("en el else");
        this.respuestaAutoCompletada = "";
        this.respuesta2 = false;
      }
    }
  }

  capturarRespuesta(event: any){
    this.respuestaRange = event.detail.value;
    this.respuesta1 = true;
    this.habilitarBoton();
  }

  respuestaRadioButton(dato: number){   
    switch (dato) {
      case 1:        
        this.respuestaRadio = "Mala";
        this.respuesta3 = true;
        console.log(this.respuestaRadio);
        this.habilitarBoton();
        break;
      case 2:        
        this.respuestaRadio = "Regular";
        this.respuesta3 = true;
        console.log(this.respuestaRadio);
        this.habilitarBoton();
        break;
      case 3:        
        this.respuestaRadio = "Buena";
        this.respuesta3 = true;
        console.log(this.respuestaRadio);
        this.habilitarBoton();
        break;
    } 
  }

  onChangeSi(ob: MatCheckboxChange) 
  {
    if(ob.checked)
    {
      this.siCheckBox = true;
      this.noCheckBox = false;
      this.momCheckBox = false;
      this.respuestaCheck = "Si";
      this.respuesta4 = true;
      this.habilitarBoton();
    }
    else
    {
      this.siCheckBox = false;
      this.respuestaCheck = "";
      this.respuesta4 = false;
      this.habilitarBoton();
    }
  }

  onChangeNo(ob: MatCheckboxChange) 
  {
    if(ob.checked)
    {
      this.siCheckBox = false;
      this.noCheckBox = true;
      this.momCheckBox = false;
      this.respuestaCheck = "No";
      this.respuesta4 = true;
      this.habilitarBoton();
    }
    else
    {
      this.noCheckBox = false;
      this.respuestaCheck = "";
      this.respuesta4 = false;
      this.habilitarBoton();
    }
  }

  onChangeMoM(ob: MatCheckboxChange) 
  {
    if(ob.checked)
    {
      this.siCheckBox = false;
      this.noCheckBox = false;
      this.momCheckBox = true;
      this.respuestaCheck = "Más o menos";
      this.respuesta4 = true;
      this.habilitarBoton();
    }
    else
    {
      this.momCheckBox = false;
      this.respuestaCheck = "";
      this.respuesta4 = false;
      this.habilitarBoton();
    }
  }

  cargarRespuesta(dato : number)
  {
    switch(dato)
    {
        case 1:
          this.respuestaMenu = "Si";
          this.respuesta5 = true;
          this.habilitarBoton();
          break;
        case 2:
          this.respuestaMenu = "No";
          this.respuesta5 = true;
          this.habilitarBoton();
          break;
        case 3:
          this.respuestaMenu = "Tal vez";
          this.respuesta5 = true;
          this.habilitarBoton();
          break;
    }
  }

  habilitarBoton()
  {
    if(this.respuesta1 == true && this.respuesta2 == true && this.respuesta3 == true && this.respuesta4 == true && this.respuesta5 == true)
    {
      this.posibleAgregar = true;
    }
    else
    {
      this.posibleAgregar = false;
    }
  }

  enviarEncuesta()
  {
    let encuesta = {
      pregunta1 : this.respuestaRange,
      pregunta2 : this.respuestaAutoCompletada,
      pregunta3 : this.respuestaRadio,
      pregunta4 : this.respuestaCheck,
      pregunta5 : this.respuestaMenu,
    }
    this.as.loading = true;
    this.fs.agregarEncuestaCliente(encuesta);
    
    setTimeout(() => {
      this.as.loading = false;
      if(this.fs.sonido){
      this.reproducirSonido("audioBueno2");
      }
      this.MostrarToast("La encuesta ha sido cargada con exito").then((toast : any) =>{
        toast.present();
      });
      this.respuestaRange = 0;
      this.respuestaAutoCompletada = "";
      this.respuestaRadio = "Nada";
      this.respuestaCheck = "";
      this.respuestaMenu = "Elegir";
      this.siCheckBox = false;
      this.noCheckBox = false;
      this.momCheckBox = false;
      this.respuestaRadio2 = "";
      this.volverEvent.emit(false);
    }, 3000);
    
  }

  MostrarToast(message : string)
  {
    return this.toastController.create({
            header: 'Encuesta',
            message: message,
            buttons: ['Ok'],
            position: 'top',
            color: 'success'
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

}
