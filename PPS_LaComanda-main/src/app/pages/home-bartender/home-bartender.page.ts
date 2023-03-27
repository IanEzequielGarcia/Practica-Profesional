import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PushService } from 'src/app/services/push.service';

@Component({
  selector: 'app-home-bartender',
  templateUrl: './home-bartender.page.html',
  styleUrls: ['./home-bartender.page.scss'],
})
export class HomeBartenderPage implements OnInit {

  pedidosEnPreparacion: any = [];
  pedidosEnPreparacionArray: any = []; //Cargo los pedidos con estado En preparacion

  loading : boolean;
  encuesta:boolean = false;
  listaUsuarios:any = [];
  constructor(
    private fs : FirestoreService, 
    private toast : ToastController,
    public as : AuthService,
    private push : PushService,
    private router: Router
  ){
    this.loading = true;

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
      message: 'Bebida Terminada.',
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

  filtrarPedidosNoEnPreparacion(item){
    if(item.estado == 'en preparacion' && item.estadoBartender == false){      
      return true;
    }else{
      return false;
    }
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

  onPedidolisto(item: any){    

    item.estadoBartender = true;
    
    if(item.estadoCocina == true){
      item.estado = "terminado"
      this.sendPushConfirmaPedido();    
    }else if(item.estadoCocina == undefined || item.estadoCocina == null){
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
           body: 'Hay un pedido para entregar.',
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
