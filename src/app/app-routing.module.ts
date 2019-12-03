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
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
})
export class AppRoutingModule { }
