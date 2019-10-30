import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

    TitlebarModule,
    ActionbarModule,
    SidebarModule,
    ToolbarModule,
  ],
})
export class AppModule { }
