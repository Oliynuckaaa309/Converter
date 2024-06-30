import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterCurrecyComponent } from './converter-currecy.component';

describe('ConverterCurrecyComponent', () => {
  let component: ConverterCurrecyComponent;
  let fixture: ComponentFixture<ConverterCurrecyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConverterCurrecyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConverterCurrecyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
