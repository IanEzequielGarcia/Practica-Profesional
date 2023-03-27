import { Component, NgModule, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-encuesta-empleado',
  templateUrl: './encuesta-empleado.component.html',
  styleUrls: ['./encuesta-empleado.component.scss'],
})

export class EncuestaEmpleadoComponent implements OnInit {

  
  pregunta_1: boolean = true;
  pregunta_2: boolean = false;
  pregunta_3: boolean = false;
  pregunta_4: boolean = false;
  si: boolean;
  no: boolean;
  pregunta_5: boolean = false;

  progreso: any = 0.05;


  respuesta_1: any = 0;
  respuesta_2: any = "";
  respuesta_3: any = "";
  respuesta_4: any = "";
  respuesta_5: any = "";

  respuestas: any = {
    respuesta_1: "",
    respuesta_2: "",
    respuesta_3: "",
    respuesta_4: "",
    respuesta_5: ""
  }

  constructor(
    public toastController: ToastController,
    public as : AuthService,
    private fs : FirestoreService
  ) { }

  ngOnInit() {
  }
  async SuccessToastEncuesta() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Encuesta Enviada!!!',
      duration: 1100,
      color: 'success'
    });
    toast.present();
  }

  onSiguientePregunta(){
    if(this.pregunta_1){

      this.pregunta_1 = false;
      this.pregunta_2 = true;
      this.progreso = 0.2;
    }else if(this.pregunta_2){


      this.pregunta_2 = false;
      this.pregunta_3 = true;
      this.progreso = 0.4;
    }else if(this.pregunta_3){


      this.pregunta_3 = false;
      this.pregunta_4 = true;
      this.progreso = 0.6;
    }else if(this.pregunta_4){

      
      this.pregunta_4 = false;
      this.pregunta_5 = true;
      this.progreso = 0.8;
    }
  }

  onAnteriorPregunta(){
    if(this.pregunta_2){
      this.pregunta_2 = false;
      this.pregunta_1 = true;
      this.progreso = 0.05;
    }else if(this.pregunta_3){
      this.pregunta_3 = false;
      this.pregunta_2 = true;
      this.progreso = 0.2;
    }else if(this.pregunta_4){
      this.pregunta_4 = false;
      this.pregunta_3 = true;
      this.progreso = 0.4;
    }else if(this.pregunta_5){
      this.pregunta_5 = false;
      this.pregunta_4 = true;
      this.progreso = 0.6;
    }
  }


  funCapRespuesta1(event:any){
    //console.log(event);
    this.respuesta_1 = event.detail.value;
    
  }

  funCapRespuesta2(event:any){
    //console.log(event);
    this.respuesta_2 = event.detail.value;
  }

  funCapRespuesta3(event:any){
    //console.log(event);
      switch (event.value) {
        case "1":        
          this.respuesta_3 = "Si";
          break;
        case "2":        
          this.respuesta_3 = "No";
          break;
        case "3":        
          this.respuesta_3 = "Mas o menos";
          break;
        default:
          this.respuesta_3 = "";
        break;
    }
}


  funCapRespuesta4(value: any){
    //console.log(event);
    if(value == 1){
      this.si = false;
      this.no = false;
      this.respuesta_4  = "Si";
    }else if(value == 2){
      this.si = false;
      this.no = false;
      this.respuesta_4  = "No";
    }
  }

  funCapRespuesta5(value:any){
    //console.log(event);
    switch (value) {
      case 1:        
        document.getElementById("respuesta").setAttribute('value',"No");
        this.respuesta_5 = "No";
        break;
      case 2:
        document.getElementById("respuesta").setAttribute('value',"Muchos");
        this.respuesta_5 = "Muchos";
        break;
      case 3:
        document.getElementById("respuesta").setAttribute('value',"Pocos");
        this.respuesta_5 = "Pocos";
        break;
    }   
    //this.respuesta_4 = "";
  }


  onEnviarRespuestas(){
    this.respuestas = {
      respuesta_1: this.respuesta_1,
      respuesta_2: this.respuesta_2,
      respuesta_3: this.respuesta_3,
      respuesta_4: this.respuesta_4,
      respuesta_5: this.respuesta_5
    };  

    this.as.loading = true;

    //console.log(this.respuestas);

    this.fs.agregarEncuestaEmpleado(this.respuestas);  

    //console.log(this.respuestas);
    setTimeout(() => {               
      //Limpiando Atributos
      this.pregunta_1 = true;
      this.pregunta_2 = false;
      this.pregunta_3 = false;
      this.pregunta_4 = false;
      this.pregunta_5 = false;
      
      this.respuesta_1 = 0;
      this.respuesta_2 = "";
      this.respuesta_3 = "";
      this.respuesta_4 = "";
      this.respuesta_5 = "";  

      this.progreso = 0.05;
      this.as.loading = false;
      this.SuccessToastEncuesta();

    }, 2500);

    //console.log(this.respuestas);

  }

}
