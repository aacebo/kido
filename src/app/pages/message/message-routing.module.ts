import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessageComponent } from './message.component';
import { MessageResolver } from './message.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: MessageComponent,
    resolve: { message: MessageResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MessageResolver],
})
export class MessageRoutingModule { }
