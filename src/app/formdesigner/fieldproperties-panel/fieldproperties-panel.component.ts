import { Component, OnInit } from '@angular/core';
import { FormField } from '../models';
import { Subject } from 'rxjs';
import { FormDesignerService } from '../formdesigner.service';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-fieldproperties-panel',
  templateUrl: './fieldproperties-panel.component.html',
  styleUrls: ['./fieldproperties-panel.component.css']
})
export class FieldpropertiesPanelComponent implements OnInit {
  public selectedFormField: FormField;
  public searchStr: string;
  public searchField = new Subject<string>();

  private _unsubscribe = new Subject<void>();

  constructor(private formDesignService: FormDesignerService) { }

  ngOnInit() {
    // keep track of which form field is selected
    this.formDesignService.selectedFormField$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(formField => {
      this.selectedFormField = formField;
    });

    // search
    this.searchField.pipe(
      // add delay
      debounceTime(400),
      // only emit if the current value is different than the last
      distinctUntilChanged(),
      // continue listening for changes until unsubscribe
      takeUntil(this._unsubscribe),
    ).subscribe(searchStr => {
      this.formDesignService.searchField(searchStr);
    });
  }

  onSearchFieldBlur() {
    // reset
    this.searchStr = null;
    this.searchField.next(null);
    this.formDesignService.searchField(null);
  }

  onSearchFieldChange(searchStr: string) {
    this.searchField.next(searchStr);
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

}
