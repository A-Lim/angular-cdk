import { Component, OnInit, Input } from '@angular/core';
import { FormField, FieldType } from '../../models';
import { Subject } from 'rxjs';
import { FormDesignerService } from '../../formdesigner.service';
import { takeUntil, map } from 'rxjs/operators';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
  @Input()
  public formField: FormField;
  public arr: Array<number>;

  public formFields: FormField[];
  public searchStr: string;
  public selectedFormField: FormField;
  public allowedFieldTypes = [1,2,3];

  private _unsubscribe$ = new Subject<void>();

  constructor(private formDesignService: FormDesignerService) { }

  ngOnInit() {
    // keep track of all form fields
    this.formDesignService.formFields$
      .pipe(
        takeUntil(this._unsubscribe$),
        // only child field
        map(x => x.filter(y => y.parentID == this.formField.formFieldID))
      )
      .subscribe(formFields => {
        this.formFields = formFields;
        // console.log(formFields);
      });


    // keep track of which form field is selected
    this.formDesignService.selectedFormField$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(formField => {
        this.selectedFormField = formField;
      });

    this.formDesignService.search$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(searchStr => {
        this.searchStr = searchStr;
      });
  }

  onDropped(event: CdkDragDrop<string[]>, column: number) {
    // move
    if (event.previousContainer === event.container) {
      const movedformField: FormField = event.item.data;
      this.formDesignService.moveField(movedformField, event.currentIndex, this.formField.formFieldID, column);
    // add
    } else {
      const addedFieldType: FieldType = event.item.data;
      this.formDesignService.addField(addedFieldType, event.currentIndex, this.formField.formFieldID, column);
    }
  }

  // onDrop(event: DndDropEvent, column: number) {
    
  //   switch (event.dropEffect) {
  //     case EffectAllowed.Copy:
  //       const fieldType: FieldType = event.data;
  //       // if type is allowed
  //       if (this.allowedFieldTypes.includes(fieldType.fieldTypeID)) {
  //         this.formDesignService.addField(fieldType, event.index, this.formField.formFieldID, column);
  //       } else {
  //         // prompt error
  //       }
        
  //       break;

  //     case EffectAllowed.Move:
  //       const formField: FormField = event.data;
  //       if (this.allowedFieldTypes.includes(formField.fieldType.fieldTypeID)) {
  //         this.formDesignService.moveField(formField, event.index, this.formField.formFieldID, column);
  //       } else {
  //         // prompt error
  //       }
  //       // this.formDesignService.moveField(event.data, event.index);
  //       break;

  //     default:
  //       break;
  //   }
  // }

  onFormFocus() {
    this.formDesignService.setSelectedFormField(null);
  }

  onFormFieldFocus(formFieldID: number, event: MouseEvent) {
    // to prevent triggering parent click event
    event.stopPropagation();
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
