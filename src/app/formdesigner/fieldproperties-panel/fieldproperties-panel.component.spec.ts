import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldpropertiesPanelComponent } from './fieldproperties-panel.component';

describe('FieldpropertiesPanelComponent', () => {
  let component: FieldpropertiesPanelComponent;
  let fixture: ComponentFixture<FieldpropertiesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldpropertiesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldpropertiesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
