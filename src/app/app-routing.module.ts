import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: `/stream`, pathMatch: 'full' },
  {
    path: 'stream',
    loadChildren: () => import('./pages/stream/stream.module').then(m => m.StreamModule),
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/message/message.module').then(m => m.MessageModule),
  },
  {
    path: 'logs',
    loadChildren: () => import('./pages/logs/logs.module').then(m => m.LogsModule),
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
})
export class AppRoutingModule { }
