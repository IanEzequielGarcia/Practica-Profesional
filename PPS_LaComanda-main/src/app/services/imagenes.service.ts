import { PathLocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { getStorage, ref, uploadString } from "firebase/storage"
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(public as : AuthService, private afs : AngularFireStorage, private fs : FirestoreService) { }

  public async addNewToGallery(cliente : any) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
      webUseInput: true,
    });

    let storage = getStorage();
    let date = new Date().getTime();
 
    let nombre = `${cliente.nombre}_${date}`;

    let storageRef = ref(storage, nombre);

    let url = this.afs.ref(nombre);

/*
    uploadString(storageRef,capturedPhoto.dataUrl, 'data_url').then(()=>{
       url.getDownloadURL().subscribe((url1 : any)=>{
        usuario.pathFoto = url1;
        this.fs.agregarUsuario(usuario);
      }) 
    });
    */

   let respuesta = {
     storage : storageRef,
     url : url,
     capturedPhoto : capturedPhoto,
     web : capturedPhoto.webPath
   }
    return respuesta;
  }



  //Alta mesa
  public async addFotoMesa(mesa: any) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
      webUseInput: true,
    });

    let storage = getStorage();
    let date = new Date().getTime();
 
    let nombre = "Nro Mesa" + mesa.nroMesa + date;
    let storageRef = ref(storage, nombre);

    let url = this.afs.ref(nombre);


   let respuesta = {
     storage : storageRef,
     url : url,
     capturedPhoto : capturedPhoto,
     web : capturedPhoto.webPath
   }
    return respuesta;
  }




  public async addFotoQR(){
     
    let date = new Date().getTime();
    let nombreArchivo = "QR - "+ date;
    let storage = getStorage();
    let storageRef = ref(storage, nombreArchivo);

    let url = this.afs.ref(nombreArchivo);  

    let respuesta = {
      storage : storageRef,
      url : url     
    }
     return respuesta;
  } 

}
