import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StreamComponent } from './stream.component';
import { ActiveStreamIdResolver } from './active-stream-id.resolver';
import { StreamLoadingGuard } from './stream-loading.guard';

const routes: Routes = [
  {
    path: '',
    component: StreamComponent,
    canActivate: [StreamLoadingGuard],
    resolve: { activeId: ActiveStreamIdResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [StreamLoadingGuard, ActiveStreamIdResolver],
})
export class StreamRoutingModule { }
