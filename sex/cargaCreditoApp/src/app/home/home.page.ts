import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { FirestoreService } from '../services/fireStoreService/firestore.service';
import { ScannerService } from 'src/app/services/scannerService/scanner.service';
import { ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usuario: any;
  perfiles: any = [];
  creditoActual: any;
  maximoAlcanzado = false;
  vaciar = false;
  cargando=false;
  constructor(public ruteo: Router, public authService: AuthService, public firestore: FirestoreService,
  public scanner: ScannerService,public toastController: ToastController) {}

  ngOnInit() {
    this.cargando = true;
    this.firestore.getCollectionWithId('perfiles','perfilId').subscribe((value)=>{
      this.perfiles = value;
      console.log(this.perfiles);
      for (const item of this.perfiles)
      {
        if(this.authService.email == item.correo)
        {
          this.usuario = item;
          console.log(this.usuario);
          this.creditoActual = this.usuario.credito;
          break;
        }
      }
      if(this.creditoActual != undefined)
      {
        this.cargando = false;
      }
    });
  }

  async cargarCredito()
  {
     let codigo: string;
    //  const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    //  // if the result has content
    //  if (result.hasContent) {
    //    console.log(result.content); // log the raw scanned content
    //  }
    this.scanner.test().then((a)=>{
      codigo = a;
      this.scanner.stopScan();
      switch(codigo)
      {
        case '8c95def646b6127282ed50454b73240300dccabc':
          this.establecerCarga(10);
          if(this.usuario.credito == this.usuario.maximo)
          {
            this.MostrarToast('Credito al maximo!!!!⚠️','','light').then((toast: any) => {
              toast.present();
            });
            this.maximoAlcanzado = true;
          }
          break;
        case 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ':
          this.establecerCarga(50);
          if(this.usuario.credito == this.usuario.maximo)
          {
            this.MostrarToast('Credito al maximo!!!!⚠️','','light').then((toast: any) => {
              toast.present();
            });
            this.maximoAlcanzado = true;
          }
          break;
        case '2786f4877b9091dcad7f35751bfcf5d5ea712b2f':
          this.establecerCarga(100);
          if(this.usuario.credito == this.usuario.maximo)
          {
            this.MostrarToast('Credito al maximo!!!!⚠️','','light').then((toast: any) => {
              toast.present();
            });
            this.maximoAlcanzado = true;
          }
          break;
    }
    });
  }

  establecerCarga(valor: number)
  {
    let variable1: any;

    if(valor == 10)
    {
      variable1 = this.usuario.carga10;
    }
    else
    {
      if(valor == 50)
      {
        variable1 = this.usuario.carga50;
      }
      else
      {
        variable1 = this.usuario.carga100;
      }
    }

    if(this.usuario.perfil == 'admin')
    {
      if(variable1 < 2)
      {
        this.usuario.credito += valor;
        variable1++;
        this.MostrarToast('Credito: ' + valor + ' cargado!👍🏼','','success').then((toast: any) => {
          toast.present();
        });
      }
      else
      {
        this.MostrarToast('No puede usar el codigo mas de 2 veces‼️','','danger').then((toast: any) => {
          toast.present();
        });
      }
    }
    else
    {
      if(variable1 < 1)
      {
        this.usuario.credito += valor;
        variable1 ++;
        this.MostrarToast('Credito: ' + valor + ' cargado!👍🏼','','success').then((toast: any) => {
          toast.present();
        });
      }
      else
      {
        this.MostrarToast('Solo puede usar una vez‼️','','danger').then((toast: any) => {
          toast.present();
        });
      }
    }

    if(valor == 10)
    {
      this.usuario.carga10 = variable1;
    }
    else
    {
      if(valor == 50)
      {
        this.usuario.carga50 = variable1;
      }
      else
      {
        this.usuario.carga100 = variable1;
      }
    }

    this.firestore.modificarPerfil(this.usuario,this.usuario.perfilId);
  }

  MostrarToast(message: string, header: string, color: string)
  {
    return this.toastController.create({
            header,
            message,
            buttons: ['Ok'],
            position: 'bottom',
            color
    });
  }

  confirmarVaciar()
  {
    this.usuario.credito = 0;
    this.usuario.carga10 = 0;
    this.usuario.carga50 = 0;
    this.usuario.carga100 = 0;
    this.creditoActual = 0;
    this.maximoAlcanzado = false;

    this.firestore.modificarPerfil(this.usuario,this.usuario.perfilId).then(() =>{
      this.MostrarToast('Se borarron los creditos!','','success').then((toast: any) => {
        toast.present();
      });
    });
  }

  vaciarCredito()
  {
    this.MostrarToastVaciar('Quiere eliminar el credito?⚠️ ','','primary').then((toast: any) => {
      toast.present();
    });
  }

  MostrarToastVaciar(message: string, header: string, color: string)
  {
    return this.toastController.create({
            header,
            message,
            buttons: [
              {
                side: 'end',
                text: 'Si',
                handler: () => {
                  this.confirmarVaciar();
                }
              }, {
                side: 'end',
                text: 'No',
                role: 'cancel',
              }
            ],
            position: 'bottom',
            color
    });
  }


  logout(){
    this.authService.logout();
    this.ruteo.navigateByUrl('login');
  }
}

