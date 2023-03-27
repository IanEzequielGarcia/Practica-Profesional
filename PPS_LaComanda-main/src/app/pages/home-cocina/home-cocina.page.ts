import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PushService } from 'src/app/services/push.service';


@Component({
  selector: 'app-home-cocina',
  templateUrl: './home-cocina.page.html',
  styleUrls: ['./home-cocina.page.scss'],
})
export class HomeCocinaPage implements OnInit {

  pedidosEnPreparacion: any = [];
  pedidosEnPreparacionArray: any = []; //Cargo los pedidos con estado En preparacion

  loading : boolean;
  encuesta:boolean = false;
  listaUsuarios:any = [];
  constructor(
    private fs : FirestoreService, 
    private toast : ToastController,
    public as : AuthService,
    public push:PushService,
    private router: Router
  ){
    this.loading = true;
    this.push.getUser();
    this.fs.traerPedidos().subscribe(value => {
      this.pedidosEnPreparacionArray = [];
      this.pedidosEnPreparacion = value;
      this.cargarArrayPedidosEnPreparacion();
    });
    this.push.getUser();

    this.fs.traerUsuarios().subscribe(value=>{
      this.listaUsuarios = value;
    })
  }

  ngOnInit() {
  }

  async SuccessToastProductoTerminado() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Comida Terminada.',
      duration: 1100,
      color: 'success'
    });
    toast.present();
  }

  cargarArrayPedidosEnPreparacion(){
    for (const item of this.pedidosEnPreparacion) {
      this.pedidosEnPreparacionArray.push(item);   
    }


    this.loading = false;
    
    this.pedidosEnPreparacionArray = this.pedidosEnPreparacionArray.filter(this.filtrarPedidosNoEnPreparacion);    
    
  }

  mostrarOcultarEncuesta(){
    if(this.encuesta){
      this.encuesta = false;
    }else{
      this.encuesta = true;
    } 
  }

  irAGraficos(){
    this.router.navigate(['/chart-encuesta-empleados']);
  }

  filtrarPedidosNoEnPreparacion(item){
    if(item.estado == 'en preparacion' && item.estadoCocina == false){      
      return true;
    }else{
      return false;
    }
  }

  onPedidolisto(item: any){    

    item.estadoCocina = true;
    
    if(item.estadoBartender == true){
      item.estado = "terminado"
      this.sendPushConfirmaPedido();    
    }else if(item.estadoBartender == undefined || item.estadoBartender == null){
      item.estado = "terminado"
      this.sendPushConfirmaPedido();    
    }

    this.fs.modificarEstadoPedido(item, item.id);
    if(this.fs.sonido){
    this.reproducirSonido("audioBueno2");
    }
    
    this.SuccessToastProductoTerminado();
  }

  sendPushConfirmaPedido() 
  {
    let token;  
    for(let i=0;i<this.listaUsuarios.length;i++){
      if(this.listaUsuarios[i].perfil == 'Mozo'){
        token = this.listaUsuarios[i].token;
        alert(token);
        break;
      }
    }

    this.push
      .sendPushNotification({
        registration_ids: [
          //TOKENS Mozos
          token
        ],
        notification: {
          title: 'Pedido Terminado',
          body: 'Pedido de cocina listo.',
        },
      })
      .subscribe((data) => {
        console.log(data);
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
