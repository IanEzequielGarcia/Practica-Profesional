import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PushService } from 'src/app/services/push.service';
import { ScannerService } from 'src/app/services/scanner.service';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.page.html',
  styleUrls: ['./home-cliente.page.scss'],
})
export class HomeClientePage implements OnInit {

  loading: boolean = false;
  escaneoQR: boolean = false;
  menuOpciones: boolean = false;
  esperaAsignacionMesa: boolean = false;
  mesaAsignada: boolean = false;
  menuOpcionesConfirma: boolean = false;
  usuariosArray: any = [];
  usuarioActual: any = "";
  numeroMesaEscaneada: number;
  menu: boolean = false;
  listaEspera: any = [];
  mesa: boolean = false;
  listado: boolean;
  pedido: any = [];
  pedidoArray: any = [];
  usuarioPedido: any = '';
  tateti: boolean = false;
  ppt: boolean = false;
  aproxima2: boolean = false;
  estadoPedido: boolean = false;
  encuesta: boolean = false;
  todasEncuestas: boolean = false;
  cuenta: boolean = false;
  chat: boolean = false;
  encuestaCargada: boolean = false;
  esperarPago: boolean = false;
  variableNormal: boolean = true;

  constructor(private as: AuthService, private fs: FirestoreService, private push : PushService,
    private sf: ScannerService, private toastController: ToastController, private router: Router) {
    //Busco en la coleccion de Lista de espera si esta, sino esta sigo en pantalla esperaAsignacionMesa
    this.escaneoQR = true;
    this.push.getUser();
    
  }

  ngOnInit() {
    this.fs.traerUsuarios().subscribe((value) => {
      this.usuariosArray = value;
      for (let item of this.usuariosArray) {
        if (item.nombre == this.as.loggedUser.nombre) {
          this.usuarioActual = item;
          if (this.usuarioActual.mesa != 0) {
            console.log("TIENE MESA");
            this.mesa = true;
            this.variableNormal = false;
          }
          break;
        }
      }
    });

    this.fs.traerPedidos().subscribe(value => {
      this.pedido = value;
      this.cargarArray();
      for (const iterator of this.pedidoArray) {
        if (iterator.usuario.nombre == this.as.loggedUser.nombre) {
          this.usuarioPedido = iterator;

          if (iterator.estado == "pagado") {
            this.cuenta = false;
          }
          else {
            if (iterator.pagoConfirmado) {
              this.esperarPago = false;
            }
          }
        }
      }
    });
  }

  cargarArray() {
    for (const item of this.pedido) {
      this.pedidoArray.push(item);
    }
  }

  onEscanearQR() {

    let datoAComparar: any;

    this.sf.test().then((data) => {

      datoAComparar = data;
      this.sf.stopScan();
      if (datoAComparar == "@Local") {
        this.escaneoQR = false;
        this.menuOpciones = true;
        
      }
      else {
        if (this.fs.sonido) {
          this.reproducirSonido("audioError");
        }
        this.MostrarToast("Este no es el QR de este local", "QR incorrecto", "danger").then((toast: any) => {
          toast.present();
        });
      }
    })

    this.escaneoQR = false;
    this.menuOpciones = true;
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

  verEncuestas() {
    this.router.navigate(['/chart-encuesta-clientes']);
  }

  esconderEncuestas() {
    this.todasEncuestas = false;

    if (this.usuarioPedido != '') {
      this.menuOpcionesConfirma = true;
    }
    else {

      this.menuOpciones = true;
    }
  }

  entrarListaEspera() {
    this.fs.agregarAListaDeEspera(this.as.loggedUser);
    this.sendPushMetre();
    this.menuOpciones = false;
    this.loading = true;
    this.variableNormal = true;
  }

  sendPushMetre() 
  {
    this.push
      .sendPushNotification({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        registration_ids: [
          // eslint-disable-next-line max-len
          //aca iria el token de metre
          'eZzkJK81RWa_rBS5r_Oq_Q:APA91bEyxJ1skDlO-_a3ZdTLxWpaazvFGIXWez4VYZFRQpxxcmBmwbqUvESCMeJOdxNissdvZUjis44IbAALvXXKbcBPjPHoQkgC1B0sWbZqZHFWEEfDPAATD8JGFZIq7XuBQMY7YStq',
        ],
        notification: {
          title: 'Lista de Espera',
          body: 'Hay un nuevo cliente esperando una mesa',
        },
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  mostrarMenu() {
    let fondo = document.getElementById("1");

    this.estadoPedido = false;

    this.sf.test().then((data) => {

      this.numeroMesaEscaneada = parseInt(data);
      this.sf.stopScan();

      if (this.numeroMesaEscaneada != this.usuarioActual.mesa) {
        if (this.usuarioActual.mesa == 0) {
          if (this.fs.sonido) {
            this.reproducirSonido("audioError");
          }
          this.MostrarToast("Usted no tiene una mesa asignada.", "Error.", "danger").then((toast: any) => {
            toast.present();
          });
        } else {
          if (this.fs.sonido) {
            this.reproducirSonido("audioError");
          }
          this.MostrarToast(`Esta no es la mesa que se le fue asignada, esta es la ${this.numeroMesaEscaneada} y usted tiene la ${this.usuarioActual.mesa}`, "Mesa incorrecta", "danger").then((toast: any) => {
            toast.present();
          });
        }
      }
      else if (this.usuarioPedido != '') {
        this.menuOpcionesConfirma = true;
        this.menu = false;
        this.mesa = false;
      }
      else {
        if (this.usuarioPedido.estado == "en preparación") {
          this.menuOpcionesConfirma = true;
          this.mesa = false;
          this.menu = false;
          this.estadoPedido = false;
        }
        else {
          this.mesa = false;
          this.menu = false;
          this.menuOpcionesConfirma = true;
        }
      }

    });
  }

  hacerPedido() {
    this.menuOpcionesConfirma = false;
    this.menu = true;
  }

  atrasCaptura(dato: boolean) {
    this.menu = dato;
    this.mesa = true;
    let test;
    setTimeout(() => {
      for (const iterator of this.pedidoArray) {

        console.log(iterator);;
        if (iterator.usuario.nombre == this.fs.usuario.nombre) {
          test = iterator;
          break;
        }
      }
      this.usuarioPedido = test;
      console.log(this.usuarioPedido);
    }, 500);
  }

  mostrarEstadoPedido() {
    this.estadoPedido = true;
    this.menuOpcionesConfirma = false;
    this.escaneoQR = false;
  }

  mostrarEncuesta() {
    this.encuesta = true;
    this.menuOpcionesConfirma = false;
    this.escaneoQR = false;
    this.usuarioPedido.pagoConfirmado = false;
    this.esperarPago = false;
  }

  volverAtras(dato: boolean) {
    this.encuesta = dato;
    this.menuOpcionesConfirma = true;
    this.encuestaCargada = true;
    this.escaneoQR = false;
  }

  terminar(dato: boolean) {
    if (this.tateti) {
      this.tateti = dato;
      this.menuOpcionesConfirma = true;
    }
    else {
      if (this.ppt) {
        this.ppt = dato
        this.menuOpcionesConfirma = true;
      }
      else {
        this.aproxima2 = dato;
        this.menuOpcionesConfirma = true;
      }
    }
  }

  confirmarEntrega() {
    this.usuarioPedido.entregaConfirmada = true;
    this.fs.modificarEstadoPedido(this.usuarioPedido, this.usuarioPedido.id);
    this.estadoPedido = false;
    this.mesa = true;
    this.escaneoQR = false;
  }

  consultarMozo() {
    this.chat = true;
    this.menuOpcionesConfirma = false;
    this.escaneoQR = false;
  }

  esconderChat() {
    this.chat = false;
    this.menuOpcionesConfirma = true;
    this.escaneoQR = false;
  }

  pedirCuenta() {
    this.cuenta = true;
    this.menuOpcionesConfirma = false;
    this.escaneoQR = false;
  }

  pagadoAtras(dato: boolean) {
    this.cuenta = dato;
    this.escaneoQR = false;
    this.menuOpcionesConfirma = false;
    this.esperarPago = true;
  }

  salir() {
    this.esperarPago = false;
    this.router.navigate(['/login']);
  }

  verEncuestasQR() {
    let dato;
    this.sf.test().then((data) => {

      dato = data;
      this.sf.stopScan();
      if (dato == "@Local") {
        this.menuOpcionesConfirma = false;
        this.todasEncuestas = true;
      }
      else {
        if (this.fs.sonido) {
          this.reproducirSonido("audioError");
        }
        this.MostrarToast("Este no es el QR de este local", "QR incorrecto", "danger").then((toast: any) => {
          toast.present();
        });
      }
    })
  }


  MostrarToast(message: string, header: string, color: string) {
    return this.toastController.create({
      header: header,
      message: message,
      buttons: ['Ok'],
      position: 'top',
      color: color
    });
  }

}
