import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdesignerComponent } from './formdesigner.component';

describe('FormdesignerComponent', () => {
  let component: FormdesignerComponent;
  let fixture: ComponentFixture<FormdesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormdesignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
