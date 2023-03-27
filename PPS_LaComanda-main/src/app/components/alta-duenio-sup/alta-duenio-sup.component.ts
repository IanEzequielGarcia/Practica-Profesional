import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { uploadString } from 'firebase/storage';
import { DuenSup } from 'src/app/interfaces/duen-sup';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ScannerService } from 'src/app/services/scanner.service';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
@Component({
  selector: 'app-alta-duenio-sup',
  templateUrl: './alta-duenio-sup.component.html',
  styleUrls: ['./alta-duenio-sup.component.scss'],
})
export class AltaDuenioSupComponent implements OnInit {

  perfil : string;
  form : FormGroup;
  duenSup : DuenSup;
  foto : any;
  capturedPhoto : any = "";
  url : any = "";
  storage : any;
  fotoSubida : boolean = false;
  webPath : string = "";
  slideDueno : boolean = false;
  slideSupervisor : boolean = false;

  constructor(private formBuilder : FormBuilder, private fs : FirestoreService, public as : AuthService, private router : Router,private sf : ScannerService, 
    private imageStore : ImagenesService) 
  { 
    this.form = this.formBuilder.group({
      'nombre' : ['',[Validators.required,Validators.minLength(2)]],
      'apellido' : ['',[Validators.required,Validators.minLength(2)]],
      'dni' : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      'cuil': ['',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
      'email' : ['',[Validators.required,Validators.email]],
      'password' : ['',[Validators.required,Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  altaDuenSup()
  {
    this.as.loading = true;
       
    this.fs.agregarDuenSup(this.duenSup);

    this.as.registro(this.duenSup);
    
    setTimeout(() => {
        this.form.reset(); 
        this.fotoSubida = false;
        this.as.loading = false;
        this.webPath = "";
        this.slideDueno = false;
        this.slideSupervisor = false;
      }, 2500);

  }

  agregarFoto()
  { 
    this.duenSup = {
      nombre : this.form.get('nombre')?.value,
      apellido : this.form.get('apellido')?.value,
      DNI : this.form.get('dni')?.value,
      CUIL: this.form.get('cuil')?.value,
      email : this.form.get('email')?.value,
      clave : this.form.get('password')?.value,
      perfil: this.perfil,
      foto : "",
      token: ""
    };
    this.imageStore.addNewToGallery(this.duenSup).then((data) =>{
      this.as.loading = true;
      this.storage = data.storage;
      this.url = data.url;
      this.capturedPhoto = data.capturedPhoto;
      this.fotoSubida = true;
      uploadString(this.storage,this.capturedPhoto.dataUrl, 'data_url').then((data) =>{    
        this.url.getDownloadURL().subscribe((url1 : any)=>{
          this.webPath = url1;
          this.duenSup.foto = url1;
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
    let cuilFinal : number;
    this.sf.test().then((data) => {
      
      datos = data.split('@');
      nombre = datos[2];
      apellido = datos[1];
      nombreFinal = nombre[0];
      apellidoFinal = apellido[0];
      cuilFinal = (datos[7])[0] + (datos[7])[1] + datos[4] + (datos[7])[2];
      
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
      this.form.get('cuil')?.setValue(cuilFinal);
      this.sf.stopScan();
    })
  }

  onChangeDuen(ob: MatSlideToggleChange) {
    if(ob.checked){
      this.slideDueno = true;
      this.slideSupervisor = false;
      this.perfil = 'Dueño';
    }else{
      this.slideDueno = false;
      this.perfil = '';
    }
  }

  onChangeSup(ob: MatSlideToggleChange) {

    if(ob.checked){
      this.slideDueno = false;
      this.slideSupervisor = true;
      this.perfil = 'Supervisor';
    }else{
      this.slideSupervisor = false;
      this.perfil = '';
    }
  }

}
