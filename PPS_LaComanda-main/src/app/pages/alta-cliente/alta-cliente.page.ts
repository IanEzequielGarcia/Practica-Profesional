import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { uploadString } from 'firebase/storage';
import { Cliente } from 'src/app/interfaces/cliente';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { MailService } from 'src/app/services/mail.service';
import { PushService } from 'src/app/services/push.service';
//import { PushService } from 'src/app/services/push.service';
import { ScannerService } from 'src/app/services/scanner.service';


@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.page.html',
  styleUrls: ['./alta-cliente.page.scss'],
})
export class AltaClientePage implements OnInit {
  perfil : string = "anonimo";
  form : FormGroup;
  cliente : Cliente;
  foto : any;
  capturedPhoto : any = "";
  url : any = "";
  storage : any;
  fotoSubida : boolean = false;
  webPath : string = "";

  constructor(private formBuilder : FormBuilder, public fs : FirestoreService, public as : AuthService, private router : Router,private sf : ScannerService, 
    private imageStore : ImagenesService, private MS : MailService, private push : PushService) 
  { 
  
    this.form = this.formBuilder.group({
      'nombre' : ['',[Validators.required,Validators.minLength(2)]],
      'apellido' : ['',[Validators.required,Validators.minLength(2)]],
      'dni' : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      'email' : ['',[Validators.required,Validators.email]],
      'password' : ['',[Validators.required,Validators.minLength(6)]]
    });
    
  }

  ngOnInit() {
  }

  public altaCliente()
  {
    this.as.loading = true;
       
    this.fs.usuario = this.cliente;
    this.fs.agregarCliente(this.cliente);
    this.sendPush();
    let usuario ={
      email: this.cliente.email,
      clave: this.cliente.clave
    }
    this.as.registro(usuario);
    this.MS.enviarAviso(this.cliente);
    
    setTimeout(() => {
        this.form.reset(); 
        this.fotoSubida = false;
        this.as.loading = false;
        this.webPath = "";
        if(this.fs.sonido){
          this.reproducirSonido("audioInicio3");
        }
        this.router.navigate(['/login']);
    }, 2500);

  }

  agregarFoto()
  { 
    this.cliente = {
      nombre : this.form.get('nombre')?.value,
      apellido : this.form.get('apellido')?.value,
      DNI : this.form.get('dni')?.value,
      foto : "",
      email : this.form.get('email')?.value,
      clave : this.form.get('password')?.value,
      habilitado : 'no',
      encuesta : null,
      perfil : "cliente",
      mesa : 0,
      juegoJugado: false,
      descuento: ""
    };
    this.imageStore.addNewToGallery(this.cliente).then((data) =>{
      this.as.loading = true;
      this.storage = data.storage;
      this.url = data.url;
      this.capturedPhoto = data.capturedPhoto;
      this.fotoSubida = true;
      uploadString(this.storage,this.capturedPhoto.dataUrl, 'data_url').then((data) =>{    
        this.url.getDownloadURL().subscribe((url1 : any)=>{
          this.webPath = url1;
          this.cliente.foto = url1;
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
    this.sf.test().then((data) => {
      
      datos = data.split('@');
      nombre = datos[2];
      apellido = datos[1];
      nombreFinal = nombre[0];
      apellidoFinal = apellido[0];
      
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
      this.sf.stopScan();
    })
  }

  
  sendPush() {
    console.log("enviando notificacion...");
    alert("enviando notificacion...")
    this.push
      .sendPushNotification({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        registration_ids: [
          // eslint-disable-next-line max-len
          'cjeTv_9sQdaEoptaOzdTV5:APA91bHv4SlYPSyIPj8gnWj_zaFFKvBWCtyfXIrg7wsPoDfEPzSY_autwadD6HNUnpxIpPt98arAzzjmqSv3TS0q-gs1PZZanILNFxlYS7WK8Roz1Z066uYhjJ7uWmioYBXY6DZ6v6st',
          'dJnzKl8aRJq_3n_Ld8vFdE:APA91bEtzhRH4xCu8tR6Uiu7IxLENEWep_ZLh4-vQdiBX6N6r2GBZsiTAp0w5NRB3AUDArbUGcNOedlx1XLnPt5bUkrE0VOu5BcoKtcg4z65oOkfwgUe8nuT1o9qGYUvo5ZGEtvA5dr6'
        ],
        notification: {
          title: 'Nuevo cliente',
          body: 'Hay un nuevo cliente esperando a ser habilitado.',
        },
      })
      .subscribe((data) => {
        alert(data);
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
