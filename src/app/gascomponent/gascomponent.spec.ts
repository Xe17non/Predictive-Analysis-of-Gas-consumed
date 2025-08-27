import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasPredictorComponent } from './gascomponent';

describe('Gascomponent', () => {
  let component: GasPredictorComponent;
  let fixture: ComponentFixture<GasPredictorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GasPredictorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GasPredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
