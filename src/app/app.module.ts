import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormdesignerComponent } from './formdesigner/formdesigner.component';
import { FieldtypesPanelComponent } from './formdesigner/fieldtypes-panel/fieldtypes-panel.component';
import { FormfieldsPanelComponent } from './formdesigner/formfields-panel/formfields-panel.component';
import { FieldpropertiesPanelComponent } from './formdesigner/fieldproperties-panel/fieldproperties-panel.component';
import { ZoneComponent } from './formdesigner/formfieldtemplates/zone/zone.component';

@NgModule({
  declarations: [
    AppComponent,
    FormdesignerComponent,
    FieldtypesPanelComponent,
    FormfieldsPanelComponent,
    FieldpropertiesPanelComponent,
    ZoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
