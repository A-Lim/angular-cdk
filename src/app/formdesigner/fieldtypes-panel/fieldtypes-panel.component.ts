import { Component, OnInit } from '@angular/core';
import { FormDesignerService } from '../formdesigner.service';
import { Observable } from 'rxjs';
import { FieldType } from '../models';

@Component({
  selector: 'app-fieldtypes-panel',
  templateUrl: './fieldtypes-panel.component.html',
  styleUrls: ['./fieldtypes-panel.component.css']
})
export class FieldtypesPanelComponent implements OnInit {
  public fieldTypes$: Observable<FieldType[]>;
  
  constructor(private formDesignService: FormDesignerService) { }

  ngOnInit() {
    this.formDesignService.retrieveFieldTypes();
    this.fieldTypes$ = this.formDesignService.fieldTypes$;
  }

}
