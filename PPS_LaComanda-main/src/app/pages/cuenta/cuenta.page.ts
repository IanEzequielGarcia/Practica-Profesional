import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ScannerService } from 'src/app/services/scanner.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  @Output() pagadoEvent = new EventEmitter<boolean>();
  pagado : boolean = false;
  loading : boolean = false;
  scaneo : boolean = false;
  precioPropina : number;
  propina : string;
  propinaporc : number = 5;
  pedido : any = [];
  precioTotal : number ;
  pedidoElegido : any;
  mesa : any;
  usuariosArray : any = [];
  usuarioActual : any;
  mesaArray : any = [];


  constructor(private fs : FirestoreService, private as : AuthService, private scan : ScannerService) { 

  }
  
  ngOnInit() 
  {
    this.fs.traerPedidos().subscribe(value =>{
      this.pedido = value;

      for (const item of this.pedido) {
       if(item.usuario.nombre == this.fs.usuario.nombre)
       {
         this.pedidoElegido = item;
       }
      }

      setTimeout(() => {
        this.fs.traerMesas().subscribe(value =>{
         this.mesaArray = value;
         for (const iterator of this.mesaArray) {
           if(this.pedidoElegido.mesa == iterator.nroMesa){
             this.mesa = iterator;
             console.log(this.mesa);
             break;
           }
         }
   
         this.fs.traerUsuarios().subscribe((value) =>
         { 
           this.usuariosArray = value;
   
           for (const iterator of this.usuariosArray) 
           {
             if(iterator.nombre == this.fs.usuario.nombre)
             {
               this.usuarioActual = iterator;
               break;
             }
           }
   
           if(this.usuarioActual.descuento != '' && this.usuarioActual.descuento != 0){
             this.pedidoElegido.precioTotal = this.pedidoElegido.precioTotal * this.usuarioActual.descuento;
            }
         })
        }); 
      }, 3000);
    });
  }
   
  


  pagar(){
    let pedidoASubir = 
    {
      pedido : this.pedidoElegido
    };
    pedidoASubir.pedido.estado = 'pagado';
    
    this.loading = true;
    setTimeout(() => {
      this.fs.agregarEstadoPedidoConfirmarPago(pedidoASubir);
      this.pagado = true;
      this.loading = false;
      this.pagadoEvent.emit(false);
    }, 3000);

  }

  qrPropina(){
    this.scan.test().then((value)=>{
      this.propina = value;

      switch (this.propina) {
        case '@Excelente':
          this.precioTotal = this.pedidoElegido.precioTotal * 0.2 + this.pedidoElegido.precioTotal;
          this.precioPropina = this.pedidoElegido.precioTotal * 0.2;
          this.propinaporc = 20;
          break;
        case '@MuyBueno':
          this.precioTotal = this.pedidoElegido.precioTotal * 0.15 + this.pedidoElegido.precioTotal;
          this.propinaporc = 15;
          break;
        case '@Bueno':
          this.precioTotal = this.pedidoElegido.precioTotal * 0.1 + this.pedidoElegido.precioTotal;
          this.propinaporc = 10;
          break;
        case '@Regular':
          this.precioTotal = this.pedidoElegido.precioTotal * 0.05 + this.pedidoElegido.precioTotal;
          this.propinaporc = 5;
          break;
      }
      this.loading = true;
      setTimeout(() => {
        this.scaneo = true;
        this.loading = false;
      }, 3000);
    });
  }
}
