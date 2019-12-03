import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgIconModule } from '../../ui/img-icon';

import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    ImgIconModule,
  ],
})
export class AboutModule { }
