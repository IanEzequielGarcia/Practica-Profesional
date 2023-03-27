import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PushService } from 'src/app/services/push.service';

@Component({
  selector: 'app-home-mozo',
  templateUrl: './home-mozo.page.html',
  styleUrls: ['./home-mozo.page.scss'],
})
export class HomeMozoPage implements OnInit {

  listConfirmarPedido: boolean = true;
  listEnEspera: boolean = false;
  encuesta:boolean = false;
  loading : boolean;

  pedidos: any = [];
  confirmacionPedidosArray: any = [];//Cargo los pedidos a confirmar en este array 
  pedidosConfirmadosArray: any = [];//Cargo los pedidos ya confirmados en este array 
  pedidosConfirmarPagoArray : any = [];
  mesasArray : any = [];
  mesaActual : any;

  titulo: string = "Pedidos a Confirmar";
  consulta : boolean = false;
  consultas : any = [];
  chat : boolean = false;
  emisor : any;
  principal : boolean = true;
  confirmaPago : boolean = false;

  constructor(
    private fs : FirestoreService, 
    private toast : ToastController,
    public as : AuthService,
    private push : PushService,
    private router: Router
  ){ 
    this.loading = true;

    this.fs.traerMesas().subscribe(value =>{
      this.mesasArray = value;
    });
    this.fs.traerPedidos().subscribe(value => {
        this.confirmacionPedidosArray = [];
        this.pedidosConfirmadosArray = [];
        this.pedidosConfirmarPagoArray = [];
        this.pedidos = value;
        this.cargarArrayPedidos();
    });

    this.fs.traerConsultas().subscribe(value => {
      this.consultas = value;
    });

    this.push.getUser();
  }

  ngOnInit() {    
    this.fs.traerPedidosConfirmar().subscribe(value=>{
      this.pedidosConfirmarPagoArray = value;
    });
  }

  cargarArrayPedidos(){
    for (const item of this.pedidos) {
      this.confirmacionPedidosArray.push(item);   
      this.pedidosConfirmadosArray.push(item);   
    }
    this.loading = false;

    //Filtro los pedidos que no esten en estado Terminado
    this.confirmacionPedidosArray = this.confirmacionPedidosArray.filter(this.filtrarPedidosAConfirmar);
    this.pedidosConfirmadosArray = this.pedidosConfirmadosArray.filter(this.filtrarPedidosEnPreparacion);
  }
  

  filtrarPedidosEnPreparacion(item){
    if(item.estado == 'en preparacion' || item.estado == 'listo' || item.estado == "terminado"){
      return true;
    }else{
      return false;
    }
  }

  filtrarPedidosAConfirmar(item){
    if(item.estado == 'espera' || item.estado == 'en proceso'){
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

  async SuccessToastPedidoConfirmado() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Pedido Confirmado.',
      duration: 1100,
      color: 'success'
    });
    toast.present();
  }

  async SuccessToastPagoConfirmado() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Pago Confirmado.',
      duration: 1100,
      color: 'success'
    });
    toast.present();
  }

  async DangerToastPedidoEnPreparacion() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'El pedido sigue en preparación',
      duration: 1100,
      color: 'danger'
    });
    toast.present();
  }

  async SuccessToastPedidoEntregado() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Pedido Entregado.',
      duration: 1100,
      color: 'success'
    });
    toast.present();
  }

  onConfirmarPedido(item: any){  
    item.estado = "en preparacion";
    
    //Si el item tiene Productos de Tipo COCINA le agrego el estadoCocina = false
    //Si el item tiene Productos de Tipo BAR le agrego el estadoBartender = false 
    for (let index = 0; index < item.productos.length; index++) {
        if(item.productos[index].tipo == "cocina"){
          item.estadoCocina = false;
        }
        if(item.productos[index].tipo == "bar"){
          item.estadoBartender = false;   
        }
    }
              
    this.fs.modificarEstadoPedido(item, item.id); 
    this.sendPushConfirmaPedido();
    if(this.fs.sonido){
    this.reproducirSonido("audioBueno2");
    }
    this.SuccessToastPedidoConfirmado();
  }
  
  sendPushConfirmaPedido() 
  {
    this.push
      .sendPushNotification({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        registration_ids: [
          // eslint-disable-next-line max-len
          'eZzkJK81RWa_rBS5r_Oq_Q:APA91bEyxJ1skDlO-_a3ZdTLxWpaazvFGIXWez4VYZFRQpxxcmBmwbqUvESCMeJOdxNissdvZUjis44IbAALvXXKbcBPjPHoQkgC1B0sWbZqZHFWEEfDPAATD8JGFZIq7XuBQMY7YStq',
          'ewFLpEGgSMqj0gNzBVjT6e:APA91bGXuBtj25lfwEy844VV2XjHhb8qVI2KAovOq3gr6hX5rCIjbM2ARQ7Ki2oYTohrQ-BN0wcv2UtyagFe7m1yj18DwM234Oj6XKorDmEkEgPvUR95b69YYtlJY7lDucXQRyj45qib'
        ],
        notification: {
          title: 'Nuevo pedido.',
          body: 'Hay un nuevo pedido para realizar.',
        },
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  sendPushPedidoTerminado() 
  {
    this.push
      .sendPushNotification({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        registration_ids: [
          // eslint-disable-next-line max-len
          'ddAwLdvvRW2BCWGeF41CL2:APA91bH3zxdbwwdDlD4n1qCrZhjrZwigEGyZs1qPrBpTUcroteMgl9snhP57Eth46tUXCq2iFPiooFFs4QsBmMLwUpxoiUJ6qWARc94XGUPa9jJZHdY7__-TMoDCN81CL4Tf5ybeM5Xb',
        ],
        notification: {
          title: 'Pedido Finalizado.',
          body: 'Hay un pedido listo para ser entregado.',
        },
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  onVerPedidosEnPreparacion(){

    this.titulo = "Pedidos en Preparación";
    this.listConfirmarPedido = false;
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.listEnEspera = true;
    }, 1000);
  }

  onVerPedidosAConfirmar(){
    
    this.titulo = "Pedidos a Confirmar";
    this.listEnEspera = false;
    this.loading = true;
    
    setTimeout(() => {
      this.loading = false;
      this.listConfirmarPedido = true;
      this.consulta = false;
      this.principal = true;
      this.confirmaPago = false;
    }, 1000);
       
  }

  onEntregarPedido(item : any){    
    if(item.estado == "en preparacion"){
      this.DangerToastPedidoEnPreparacion();
    }else if(item.estado == "terminado"){
        this.sendPushPedidoTerminado();
        item.estado = "entregado";
               
        this.fs.modificarEstadoPedido(item, item.id);
        if(this.fs.sonido){
        this.reproducirSonido("audioBueno2");
        }
        this.SuccessToastPedidoEntregado();                 
    }    
  }

  verConsultas()
  {
    this.consulta = true;
    this.principal = false;
  }

  responderConsulta(dato : any)
  {
    this.chat = true;
    this.emisor = dato;
    this.consulta = false;
  }

  esconderChat()
  {
    this.consulta = true;
    this.chat = false;
    this.emisor = "";
  }

  listConfirmaPago(){
    this.principal = false;
    this.confirmaPago = true;
  }

  cambiarEstadoConfirmarPago(item : any){
    
    for (const iterator of this.mesasArray) {
      if(iterator.nroMesa == item.pedido.mesa){
        this.mesaActual = iterator;
        break;
      }
    }

    
    item.pedido.estadoPedido = 'pagado';
    item.pedido.pagoConfirmado = true;
    item.pedido.usuario.juegoJugado = false;
    item.pedido.usuario.descuento = "";
    item.pedido.usuario.mesa = 0;
    this.fs.modificarUsuario(item.pedido.usuario,item.pedido.usuario.id);
    this.mesaActual.ocupada = false;
    this.fs.modificarMesa(this.mesaActual, this.mesaActual.id);
    this.fs.modificarEstadoPedido(item.pedido,item.pedido.id);
    this.fs.eliminarPedidoConfirmarPago(item.id);

    this.loading = true;
    setTimeout(() => {
      if(this.fs.sonido){
      this.reproducirSonido("audioBueno2");
      }
      this.SuccessToastPagoConfirmado();
      this.loading = false;
    }, 3000);
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
