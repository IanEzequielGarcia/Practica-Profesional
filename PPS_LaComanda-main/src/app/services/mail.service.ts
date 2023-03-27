import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';
import { environment } from 'src/environments/environment';
import { init } from "emailjs-com";
init("VGlXg9BNP5K1iAnnr");
@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor() { }

  enviarAviso(usuario: any){
    let date = new Date();
    let templateParams = {
      to_name: usuario.nombre,
      message: "Para poder acceder a la aplicación, debe aguardar que su cuenta sea verificada.",
      mail_usuario: usuario.email,
      from_name: environment.appName,
      date: date
    };
    emailjs.send(environment.emailService.serviceID, environment.emailService.templateID, templateParams)
      .then(res =>{
        console.log("Email enviado.", res.status, res.text);
      })
      .catch(error =>{
        console.log("Error al enviar el email.", error);
      });
  }

  enviarAvisoHabilitado(usuario: any){
    let date = new Date();
    let templateParams = {
      to_name: usuario.nombre,
      message: "Su cuenta ha sido verificada, ya puede ingresar a la aplicación.",
      mail_usuario: usuario.email,
      from_name: environment.appName,
      date: date
    };

    emailjs.send(environment.emailService.serviceID, environment.emailService.templateID, templateParams)
      .then(res =>{
        console.log("Email enviado.", res.status, res.text);
      })
      .catch(error =>{
        console.log("Error al enviar el email.", error);
      });
  }

  enviarAvisoRechazado(usuario: any){
    let date = new Date();
    let templateParams = {
      to_name: usuario.nombre,
      message: "Su cuenta ha sido RECHAZADA, no puede ingresar a la aplicación.",
      mail_usuario: usuario.email,
      from_name: environment.appName,
      date: date
    };

    emailjs.send(environment.emailService.serviceID, environment.emailService.templateID, templateParams)
      .then(res =>{
        console.log("Email enviado.", res.status, res.text);
      })
      .catch(error =>{
        console.log("Error al enviar el email.", error);
      });
  }
}



