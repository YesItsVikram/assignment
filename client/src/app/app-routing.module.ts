import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ContainerListComponent } from './container-list/container-list.component';

const routes: Routes = [

  {
    path: 'items',
    component: ItemListComponent,
  },

  {
    path: 'containers',
    component: ContainerListComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'containers'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
