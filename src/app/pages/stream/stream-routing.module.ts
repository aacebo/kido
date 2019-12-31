import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StreamComponent } from './stream.component';
import { StreamResolver } from './stream.resolver';
import { StreamLoadingGuard } from './stream-loading.guard';

const routes: Routes = [
  {
    path: '',
    component: StreamComponent,
    canActivate: [StreamLoadingGuard],
    resolve: { activeId: StreamResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [StreamLoadingGuard, StreamResolver],
})
export class StreamRoutingModule { }
