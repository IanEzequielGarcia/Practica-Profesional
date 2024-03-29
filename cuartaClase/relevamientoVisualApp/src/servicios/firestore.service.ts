import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  cosasLindasCollectionReference: any;
  cosasLindas: Observable<any>;

  cosasFeasCollectionReference: any;
  cosasFeas: Observable<any>;

  cosasLindasArray: any = [];
  cosasFeasArray: any = [];

  constructor(private firestore: AngularFirestore)
  {
    this.cosasLindasCollectionReference = this.firestore.collection<any>('cosasLindas');
    this.cosasLindas = this.cosasLindasCollectionReference.valueChanges({idField: 'id'});
    console.log( this.cosasLindasCollectionReference);

    this.cosasFeasCollectionReference = this.firestore.collection<any>('cosasFeas');
    this.cosasFeas = this.cosasFeasCollectionReference.valueChanges({idField: 'id'});

    this.traerCosasLindas().subscribe(value => {
      this.cosasLindasArray = value;
      console.log( this.cosasLindasArray);
    });
    this.traerCosasFeas().subscribe(value => {
      this.cosasFeasArray = value;
    });
  }

  getCollection(coleccion: any){
    return this.firestore.collection(coleccion).valueChanges();
  }

  traerCosasLindas()
  {
    return this.cosasLindas;
  }

  traerCosasFeas()
  {
    return this.cosasFeas;
  }

  modificarFoto(foto: any, id: any, coleccion: string)
  {
    return this.firestore.collection(coleccion).doc(id).update(foto);
  }

  agregarFoto(foto: any,dato: number)
  {
    if(dato === 1)
    {
      this.cosasLindasCollectionReference.add({...foto});
    }
    else
    {
      if(dato === 2)
      {
        this.cosasFeasCollectionReference.add({...foto});
      }
    }
  }

  public obtenerTodos(collection) {
    return this.firestore.collection(collection).snapshotChanges();
  }
}
