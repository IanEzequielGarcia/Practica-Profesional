import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartEncuestaSupervisorPage } from './chart-encuesta-supervisor.page';

describe('ChartEncuestaSupervisorPage', () => {
  let component: ChartEncuestaSupervisorPage;
  let fixture: ComponentFixture<ChartEncuestaSupervisorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartEncuestaSupervisorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartEncuestaSupervisorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
