import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: `/stream`, pathMatch: 'full' },
  {
    path: 'stream',
    loadChildren: () => import('./pages/stream/stream.module').then(m => m.StreamModule),
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
})
export class AppRoutingModule { }
