import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  usuario: any;

  sonido: boolean = true;

  usuariosCollectionReference: any;
  usuarios: Observable<any>;
  usuariosArray: any = [];

  consultasCollectionReference: any;
  consultas: Observable<any>;
  consultasArray: any = [];

  listaEsperaCollectionReference: any;
  listaEspera: Observable<any>;
  listaEsperaArray: any = [];

  pedidosCollectionReference: any;
  pedidos: Observable<any>;
  pedidosArray: any = [];

  clientesCollectionReference: any;
  clientes: Observable<any>;

  clientesArray: any = [];

  productosCollectionReference: any;
  productos: Observable<any>;

  productosArray: any = [];

  encuestasClientesCollectionReference: any;
  encuestasClientes: Observable<any>;

  encuestasClientesArray: any = [];

  duenSupCollectionReference: any;
  duenSup: Observable<any>;

  duenSupArray: any = [];

  empleadoCollectionReference: any;
  empleados: Observable<any>;

  empleadoArray: any = [];


  mesaCollectionReference: any;
  mesas: Observable<any>;

  mesaArray: any = [];


  encuestaEmpleadoCollectionReference: any;
  encuestasEmpleados: Observable<any>;

  encuestaSupervisorCollectionReference: any;
  encuestasSupervisor: Observable<any>;

  encuestaArray: any = [];

  pedidosConfirmadosCollectionReference: any;
  pedidosConfirmados: Observable<any>;
  pedidosConfirmadosArray: any = [];

  constructor(private angularF: AngularFirestore) {

    this.pedidosConfirmadosCollectionReference = this.angularF.collection<any>('pagosAConfirmar');
    this.pedidosConfirmados = this.pedidosConfirmadosCollectionReference.valueChanges({ idField: 'id' });

    this.listaEsperaCollectionReference = this.angularF.collection<any>('listaEspera');
    this.listaEspera = this.listaEsperaCollectionReference.valueChanges({ idField: 'id' });

    this.consultasCollectionReference = this.angularF.collection<any>('consultas');
    this.consultas = this.consultasCollectionReference.valueChanges({ idField: 'id' });


    this.pedidosCollectionReference = this.angularF.collection<any>('pedidos');
    this.pedidos = this.pedidosCollectionReference.valueChanges({ idField: 'id' });


    this.usuariosCollectionReference = this.angularF.collection<any>('usuarios');
    this.usuarios = this.usuariosCollectionReference.valueChanges({ idField: 'id' });


    this.clientesCollectionReference = this.angularF.collection<any>('clientes');
    this.clientes = this.clientesCollectionReference.valueChanges({ idField: 'id' });


    this.productosCollectionReference = this.angularF.collection<any>('productos');
    this.productos = this.productosCollectionReference.valueChanges({ idField: 'id' });

    this.encuestasClientesCollectionReference = this.angularF.collection<any>('encuestasClientes');
    this.encuestasClientes = this.encuestasClientesCollectionReference.valueChanges({ idField: 'id' });


    this.duenSupCollectionReference = this.angularF.collection<any>('duenSups');
    this.duenSup = this.duenSupCollectionReference.valueChanges({ idField: 'id' });


    this.empleadoCollectionReference = this.angularF.collection<any>('empleados');
    this.empleados = this.empleadoCollectionReference.valueChanges({ idField: 'id' });


    this.mesaCollectionReference = this.angularF.collection<any>('mesas');
    this.mesas = this.mesaCollectionReference.valueChanges({ idField: 'id' });


    this.encuestaEmpleadoCollectionReference = this.angularF.collection<any>('encuestasEmpleados');
    this.encuestasEmpleados = this.encuestaEmpleadoCollectionReference.valueChanges({ idField: 'id' });

    this.encuestaSupervisorCollectionReference = this.angularF.collection<any>('encuestasSupervisores');
    this.encuestasSupervisor = this.encuestaSupervisorCollectionReference.valueChanges({ idField: 'id' });
  }

  traerPedidosConfirmar() {
    return this.pedidosConfirmados;
  }

  traerClientes() {
    return this.clientes;
  }

  traerUsuarios() {
    return this.usuarios;
  }

  traerConsultas() {
    return this.consultas;
  }

  traerlistaEspera() {
    return this.listaEspera;
  }

  traerPedidos() {
    return this.pedidos;
  }

  traerProductos() {
    return this.productos;
  }

  traerEncuestasClientes() {
    return this.encuestasClientes;
  }

  traerDuenSups() {
    return this.duenSup;
  }

  traerempleados() {
    return this.empleados;
  }

  traerMesas() {
    return this.mesas;
  }

  traerEncuestasEmpleados() {
    return this.encuestasEmpleados;
  }

  traerEncuestasSupervisor() {
    return this.encuestasSupervisor;
  }

  /*   modificarFoto(foto : any, id : any, coleccion : string)
    {
      return this.angularF.collection(coleccion).doc(id).update(foto);
    } */


  agregarEstadoPedidoConfirmarPago(objeto: any) {
    return this.angularF.collection('pagosAConfirmar').add(objeto);
  }

  eliminarPedidoConfirmarPago(id_objeto: any) {
    return this.angularF.collection('pagosAConfirmar').doc(id_objeto).delete();
  }

  modificarCliente(objeto: any, id_objeto: any) {
    this.usuario = objeto;
    return this.angularF.collection('clientes').doc(id_objeto).update(objeto);
  }

  modificarUsuario(objeto: any, id_objeto: any) {
    this.usuario = objeto;
    return this.angularF.collection('usuarios').doc(id_objeto).update(objeto);
  }

  modificarMesa(objeto: any, id_objeto: any) {
    return this.angularF.collection('mesas').doc(id_objeto).update(objeto);
  }

  //Modificar Estado Pedido
  modificarEstadoPedido(objeto: any, id_objeto: any) {
    return this.angularF.collection('pedidos').doc(id_objeto).update(objeto);
  }

  eliminarListaEspera(id_objeto: any) {
    return this.angularF.collection('listaEspera').doc(id_objeto).delete();
  }

  agregarCliente(cliente: any) {
    this.clientesCollectionReference.add({ ...cliente });
    this.usuariosCollectionReference.add({ ...cliente });

  }

  agregarConsulta(consulta: any) {
    this.consultasCollectionReference.add({ ...consulta });
  }

  eliminarConsulta(id_objeto: any) {
    return this.angularF.collection('consultas').doc(id_objeto).delete();
  }

  agregarAListaDeEspera(user: any) {  
    this.listaEsperaCollectionReference.add({ ...this.usuario });
  }

  agregarEmpleado(empleado: any) {
    this.empleadoCollectionReference.add({ ...empleado });
    this.usuariosCollectionReference.add({ ...empleado });
  }

  agregarProducto(producto: any) {
    this.productosCollectionReference.add({ ...producto });
  }

  agregarEncuestaCliente(ec: any) {
    this.encuestasClientesCollectionReference.add({ ...ec });
  }

  agregarDuenSup(duenSup: any) {
    this.duenSupCollectionReference.add({ ...duenSup });
    this.usuariosCollectionReference.add({ ...duenSup });
  }

  agregarMesa(mesa: any) {
    this.mesaCollectionReference.add({ ...mesa });
  }

  agregarEncuestaEmpleado(encuesta: any) {
    this.encuestaEmpleadoCollectionReference.add({ ...encuesta });
  }

  agregarEncuestaSupervisor(encuesta: any) {
    this.encuestaSupervisorCollectionReference.add({ ...encuesta });
  }

  agregarPedido(pedido: any) {
    this.pedidosCollectionReference.add({ ...pedido });
  }

  guardarToken(user: any, token: any) {
    console.log(user);
    this.angularF.collection('usuarios').doc(user.id).update({ token: token });
  }
}
