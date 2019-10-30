import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

import { TitlebarModule } from './features/titlebar';
import { ActionbarModule } from './features/actionbar';
import { SidebarModule } from './features/sidebar';
import { ToolbarModule } from './features/toolbar';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    StoreModule.forRoot({ }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 10,
    }),

    TitlebarModule,
    ActionbarModule,
    SidebarModule,
    ToolbarModule,
  ],
})
export class AppModule { }
