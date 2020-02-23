import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormfieldsPanelComponent } from './formfields-panel.component';

describe('FormfieldsPanelComponent', () => {
  let component: FormfieldsPanelComponent;
  let fixture: ComponentFixture<FormfieldsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormfieldsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormfieldsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
