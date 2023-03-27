import { Component, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { EventEmitter } from '@angular/core';
//import { PushService } from 'src/app/services/push.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
})
export class ListaProductosPage implements OnInit {
  productos: any = [];
  productosArray: any = [];
  usuarios: any = [];
  usuarioActual: any;

  @Output() atrasEvent = new EventEmitter<boolean>();

  loading: boolean = false;
  productExist: boolean = false;
  position: number;

  carrito: any = [];
  precioCarrito: number = 0;
  tiempoEstimado: number = 0;
  maxCarrito: number = 0;

  constructor(public fs: FirestoreService, private toast: ToastController, /*private push : PushService*/) {
    this.fs.traerProductos().subscribe((value => {
      this.productos = value;
      this.cargarArray();
    }));

    this.fs.traerUsuarios().subscribe((value => {
      this.usuarios = value;

      for (const iterator of this.usuarios) {
        if (iterator.nombre == this.fs.usuario.nombre) {
          this.usuarioActual = iterator;
          break;
        }
      }
    }));
  }

  ngOnInit() {
  }

  cargarArray() {
    for (const item of this.productos) {
      this.productosArray.push(item);
    }
  }

  cargarCarrito(item: any) {
    console.log(item);
    if (this.maxCarrito < 4) {
      for (let i = 0; i < this.carrito.length; i++) {

        if (item.nombre == this.carrito[i].nombre) {
          this.productExist = true;
          this.position = i;
          break;
        }

      };

      if (this.productExist) {
        this.carrito[this.position].cantidad++;
        this.maxCarrito++;
        this.productExist = false;
      } else {
        item.cantidad = 1;
        this.maxCarrito++;
        this.carrito.push(item);
      }
      this.tiempoEstimado += parseInt(item.tiempoPromedio);
      this.precioCarrito += parseInt(item.precio);
    } else {
      if (this.fs.sonido) {
        this.reproducirSonido("audioError");
      }
      this.ErrorToastCarrito();
    }
    console.log(this.carrito);
  }

  quitarProductoCarrito(item: any) {
    if (this.maxCarrito > 0) {
      for (let i = 0; i < this.carrito.length; i++) {
        if (item.nombre == this.carrito[i].nombre) {
          this.productExist = true;
          this.position = i;
          break;
        }
      };

      if (this.productExist && this.carrito[this.position].cantidad > 0) {
        this.productExist = false;
        this.carrito[this.position].cantidad--;
        this.maxCarrito--;
        this.precioCarrito -= parseInt(item.precio);
        this.tiempoEstimado -= parseInt(item.tiempoPromedio);
      }
    }

  }

  realizarPedido() {
    let pedido = {
      productos: this.carrito,
      precioTotal: this.precioCarrito,
      usuario: this.usuarioActual,
      tiempoEstimado: this.tiempoEstimado,
      estado: "espera",
      entregaConfirmada: false,
      mesa: this.usuarioActual.mesa,
      pagoConfirmado: false
    }

    this.loading = true;

    setTimeout(() => {
      this.fs.agregarPedido(pedido);
      if (this.fs.sonido) {
        this.reproducirSonido("audioBueno2");
      }
      this.successToast();
      this.loading = false;

      //esconder la lista de productos
      this.atrasEvent.emit(false);
    }, 3000);
  }

  esconderProductos() {
    this.atrasEvent.emit(false);
  }

  async ErrorToastCarrito() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Carrito lleno!!',
      duration: 1100,
      color: 'danger'
    });
    toast.present();
  }

  async successToast() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Pedido enviado excitosamente!!',
      duration: 1100,
      color: 'success'
    });
    toast.present();
  }

  reproducirSonido(dato: string) {
    let ruta: string = '../../../assets/sonidos/';
    let nombreArchivo: string = "";
    let audioNombre: string = "";

    audioNombre = dato + ".mp3";
    nombreArchivo = ruta + audioNombre;

    this.reproducir(nombreArchivo);

  }

  reproducir(ruta: string) {
    let audio = new Audio(ruta);
    audio.play();
  }

}
