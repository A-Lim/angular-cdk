import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldtypesPanelComponent } from './fieldtypes-panel.component';

describe('FieldtypesPanelComponent', () => {
  let component: FieldtypesPanelComponent;
  let fixture: ComponentFixture<FieldtypesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldtypesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldtypesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
