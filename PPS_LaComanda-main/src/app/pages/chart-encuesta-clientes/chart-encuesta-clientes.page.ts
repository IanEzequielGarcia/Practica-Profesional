import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LegendPosition } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-chart-encuesta-clientes',
  templateUrl: './chart-encuesta-clientes.page.html',
  styleUrls: ['./chart-encuesta-clientes.page.scss'],
})
export class ChartEncuestaClientesPage implements OnInit {

  // options advanced Pie Chart
  gradientChartAdvanced: boolean = false;
  // showLegend: boolean = false;
  // showLabels: boolean = false;
  // isDoughnut: boolean = false;
  tooltipDisabledChartAdvanced: boolean = false;

  // options Pie Grid Chart
  // showLegendChartGrid: boolean = true;
  // showLabelsChartGrid: boolean = true;


  // options Bar Horizontal Chart ChartBarHorizontal
  gradientChartBarHorizontal: boolean = false;
  showXAxisChartBarHorizontal: boolean = true;
  showYAxisChartBarHorizontal: boolean = true;
  showLegendChartBarHorizontal: boolean = false;
  showXAxisLabelChartBarHorizontal: boolean = true;
  yAxisLabelChartBarHorizontal: string = 'Preguntas';
  showYAxisLabelChartBarHorizontal: boolean = true;
  xAxisLabelChartBarHorizontal: string = 'Cantidad Respuestas';
  showDataLabelChartBarHorizontal: boolean = true;


  // options Bar Vertial Chart ChartBarVertical
  showXAxisChartBarVertical = true;
  showYAxisChartBarVertical = true;
  gradientChartBarVertical = false;
  showLegendChartBarVertical = false;
  showXAxisLabelChartBarVertical = true;
  xAxisLabelChartBarVertical = 'Preguntas';
  showYAxisLabelChartBarVertical = true;
  yAxisLabelChartBarVertical = 'Cantidad Respuestas';


  // options Chart Line
  // legend: boolean = true;
  // showLabels: boolean = true;
  // animations: boolean = true;
  // xAxis: boolean = true;
  // yAxis: boolean = true;
  // showYAxisLabel: boolean = true;
  // showXAxisLabel: boolean = true;
  // xAxisLabel: string = 'Year';
  // yAxisLabel: string = 'Population';
  // timeline: boolean = true;

  // options Pie Chart
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  preguntas1 = []; //Datos del Chart
  preguntas2 = []; //Datos del Chart
  preguntas3 = []; //Datos del Chart
  preguntas4 = []; //Datos del Chart
  preguntas5 = []; //Datos del Chart


  arrayEncuestaClientePregunta1: any = [];
  arrayEncuestaClientePregunta2: any = [];
  arrayEncuestaClientePregunta3: any = [];
  arrayEncuestaClientePregunta4: any = [];
  arrayEncuestaClientePregunta5: any = [];


  encuestas: any = [];
  encuestasClientesArray: any = [];

  loading: boolean;

  constructor(
    private fs: FirestoreService,
    public as: AuthService
  ) {
    this.loading = true;

    this.fs.traerEncuestasClientes().subscribe(value => {
      this.encuestasClientesArray = [];

      this.preguntas1 = [];
      this.preguntas2 = [];
      this.preguntas3 = [];
      this.preguntas4 = [];
      this.preguntas5 = [];

      this.arrayEncuestaClientePregunta1 = [];
      this.arrayEncuestaClientePregunta2 = [];
      this.arrayEncuestaClientePregunta3 = [];
      this.arrayEncuestaClientePregunta4 = [];
      this.arrayEncuestaClientePregunta5 = [];

      this.valorRespuesta1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.valorRespuesta2 = [0, 0];
      this.valorRespuesta3 = [0, 0, 0];
      this.valorRespuesta4 = [0, 0, 0];
      this.valorRespuesta5 = [0, 0, 0];

      this.encuestas = value;

      this.cargarArrayEncuestas();
    });
  }

  ngOnInit() {
  }

  cargarArrayEncuestas() {
    for (const item of this.encuestas) {
      this.encuestasClientesArray.push(item);
    }

    this.loading = false;

    //console.log(this.encuestasClientesArray);

    //Cargo el Chart con los resultados de las preguntas 1
    this.calcularDatosPregunta1();
    this.CargoDatosPregunta1();

    //Cargo el Chart con los resultados de las preguntas 2
    this.calcularDatosPregunta2();
    this.CargoDatosPregunta2();

    //Cargo el Chart con los resultados de las preguntas 3
    this.calcularDatosPregunta3();
    this.CargoDatosPregunta3();

    //Cargo el Chart con los resultados de las preguntas 4
    this.calcularDatosPregunta4();
    this.CargoDatosPregunta4();

    //Cargo el Chart con los resultados de las preguntas 5
    this.calcularDatosPregunta5();
    this.CargoDatosPregunta5();

    //console.log(this.encuestasClientesArray);
  }

  // Chart Pregunta 1
  valorRespuesta1: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //[1,2,3,4,5,6,7,8,9,10] valores del Range
  calcularDatosPregunta1() {

    for (let index = 0; index < this.encuestasClientesArray.length; index++) {
      switch (this.encuestasClientesArray[index].pregunta1) {
        case 1:
          this.valorRespuesta1[0]++;
          break;
        case 2:
          this.valorRespuesta1[1]++;
          break;
        case 3:
          this.valorRespuesta1[2]++;
          break;
        case 4:
          this.valorRespuesta1[3]++;
          break;
        case 5:
          this.valorRespuesta1[4]++;
          break;
        case 6:
          this.valorRespuesta1[5]++;
          break;
        case 7:
          this.valorRespuesta1[6]++;
          break;
        case 8:
          this.valorRespuesta1[7]++;
          break;
        case 9:
          this.valorRespuesta1[8]++;
          break;
        case 10:
          this.valorRespuesta1[9]++;
          break;
      }
    }
    //console.log(this.valorRespuesta1);
  }

  CargoDatosPregunta1() {

    this.preguntas1 = [
      {
        "name": "Calificación: 10",
        "value": this.valorRespuesta1[9]
      }, {
        "name": "Calificación: 9",
        "value": this.valorRespuesta1[8]
      }, {
        "name": "Calificación: 8",
        "value": this.valorRespuesta1[7]
      }, {
        "name": "Calificación: 7",
        "value": this.valorRespuesta1[6]
      }, {
        "name": "Calificación: 6",
        "value": this.valorRespuesta1[5]
      }, {
        "name": "Calificación: 5",
        "value": this.valorRespuesta1[4]
      }, {
        "name": "Calificación: 4",
        "value": this.valorRespuesta1[3]
      }, {
        "name": "Calificación: 3",
        "value": this.valorRespuesta1[2]
      }, {
        "name": "Calificación: 2",
        "value": this.valorRespuesta1[1]
      },
      {
        "name": "Calificación: 1",
        "value": this.valorRespuesta1[0]
      }
    ];
  }

  // Chart Pregunta 2
  valorRespuesta2: any = [0, 0]; //[Si,No]
  calcularDatosPregunta2() {
    for (let index = 0; index < this.encuestasClientesArray.length; index++) {
      let valor = this.encuestasClientesArray[index].pregunta2;
      switch (valor.toLowerCase()) {
        case "si":
          this.valorRespuesta2[0]++;
          break;
        case "no":
          this.valorRespuesta2[1]++;
          break;
      }
    }
    //console.log(this.valorRespuesta2);
  }

  CargoDatosPregunta2() {
    this.preguntas2 = [
      {
        "name": "Si",
        "value": this.valorRespuesta2[0]
      }, {
        "name": "No",
        "value": this.valorRespuesta2[1]
      }
    ];
  }

  // Chart Pregunta 3
  valorRespuesta3: any = [0, 0, 0]; //[Buena, Regular, Mala]
  calcularDatosPregunta3() {
    for (let index = 0; index < this.encuestasClientesArray.length; index++) {
      switch (this.encuestasClientesArray[index].pregunta3) {
        case "Mala":
          this.valorRespuesta3[0]++;
          break;
        case "Regular":
          this.valorRespuesta3[1]++;
          break;
        case "Buena":
          this.valorRespuesta3[2]++;
          break;
      }
    }
    //console.log(this.valorRespuesta3);
  }

  CargoDatosPregunta3() {
    this.preguntas3 = [
      {
        "name": "Buena",
        "value": this.valorRespuesta3[2]
      }, {
        "name": "Regular",
        "value": this.valorRespuesta3[1]
      }, {
        "name": "Mala",
        "value": this.valorRespuesta3[0]
      }
    ];
  }

  // Chart Pregunta 4
  valorRespuesta4: any = [0, 0, 0]; //[Si, No, Mas o menos]
  calcularDatosPregunta4() {
    for (let index = 0; index < this.encuestasClientesArray.length; index++) {
      switch (this.encuestasClientesArray[index].pregunta4) {
        case "Si":
          this.valorRespuesta4[0]++;
          break;
        case "No":
          this.valorRespuesta4[1]++;
          break;
        case "Más o menos":
          this.valorRespuesta4[2]++;
          break;
      }
    }
    //console.log(this.valorRespuesta4);
  }

  CargoDatosPregunta4() {
    this.preguntas4 = [
      {
        "name": "Si",
        "value": this.valorRespuesta4[0]
      }, {
        "name": "Más o menos",
        "value": this.valorRespuesta4[2]
      }, {
        "name": "No",
        "value": this.valorRespuesta4[1]
      }
    ];
  }

  // Chart Pregunta 4
  valorRespuesta5: any = [0, 0, 0]; //[Si, No, Tal vez]
  calcularDatosPregunta5() {
    for (let index = 0; index < this.encuestasClientesArray.length; index++) {
      switch (this.encuestasClientesArray[index].pregunta5) {
        case "Si":
          this.valorRespuesta5[0]++;
          break;
        case "No":
          this.valorRespuesta5[1]++;
          break;
        case "Tal vez":
          this.valorRespuesta5[2]++;
          break;
      }
    }
    //console.log(this.valorRespuesta5);
  }

  CargoDatosPregunta5() {
    this.preguntas5 = [
      {
        "name": "Si",
        "value": this.valorRespuesta5[0]
      }, {
        "name": "Tal vez",
        "value": this.valorRespuesta5[2]
      }, {
        "name": "No",
        "value": this.valorRespuesta5[1]
      }
    ];

  }

}