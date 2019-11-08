import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StreamComponent } from './stream.component';
import { StreamResolver } from './stream.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: StreamComponent,
    resolve: { stream: StreamResolver },
  },
  {
    path: '',
    component: StreamComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [StreamResolver],
})
export class StreamRoutingModule { }
