import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartEncuestaClientesPage } from './chart-encuesta-clientes.page';

describe('ChartEncuestaClientesPage', () => {
  let component: ChartEncuestaClientesPage;
  let fixture: ComponentFixture<ChartEncuestaClientesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartEncuestaClientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartEncuestaClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
