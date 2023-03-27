import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartEncuestaEmpleadosPage } from './chart-encuesta-empleados.page';

describe('ChartEncuestaEmpleadosPage', () => {
  let component: ChartEncuestaEmpleadosPage;
  let fixture: ComponentFixture<ChartEncuestaEmpleadosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartEncuestaEmpleadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartEncuestaEmpleadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
