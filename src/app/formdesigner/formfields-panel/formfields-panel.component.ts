import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormDesignerService } from '../formdesigner.service';
import { FormField, FieldType } from '../models';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-formfields-panel',
  templateUrl: './formfields-panel.component.html',
  styleUrls: ['./formfields-panel.component.css']
})
export class FormfieldsPanelComponent implements OnInit, OnDestroy {
  public parentFormFields: FormField[];
  public searchStr: string;
  public selectedFormField: FormField;

  private _unsubscribe$ = new Subject<void>();

  constructor(public formDesignService: FormDesignerService) { }

  ngOnInit() {
    this.formDesignService.retrieveFormFields();

    // keep track of all form fields
    this.formDesignService.formFields$
      .pipe(
        takeUntil(this._unsubscribe$),
        // only get non-parent form fields
        map(x => x.filter(y => y.parentID == null))
      )
      .subscribe(formFields => {
        console.log(formFields);
        this.parentFormFields = formFields;
      });
    
    // keep track of which form field is selected
    this.formDesignService.selectedFormField$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(formField => {
        this.selectedFormField = formField;
      });

    // keep track search string
    this.formDesignService.search$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(searchStr => {
        this.searchStr = searchStr;
      });
  }

  onDropped(event: CdkDragDrop<string[]>) {
    // move
    if (event.previousContainer === event.container) {
      const movedFormField: FormField = event.item.data;
      this.formDesignService.moveField(movedFormField, event.currentIndex);
    // add
    } else {
      const addedFieldType: FieldType = event.item.data;
      this.formDesignService.addField(addedFieldType, event.currentIndex);
    }
  }

  onFormFocus() {
    this.formDesignService.setSelectedFormField(null);
  }

  onFormFieldFocus(formFieldID: number) {
    this.resetSearch();
    this.formDesignService.setSelectedFormField(formFieldID);
  }

  private resetSearch() {
    this.searchStr = null;
    this.formDesignService.searchField(null);
  }
  
  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
