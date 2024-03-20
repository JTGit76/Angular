import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonTableComponent } from './common/common-table/common-table.component';

const routes: Routes = [
  { path: 'common-table', component: CommonTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
