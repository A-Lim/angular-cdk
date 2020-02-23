import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormdesignerComponent } from './formdesigner/formdesigner.component';


const routes: Routes = [
  { path: '', component: FormdesignerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
