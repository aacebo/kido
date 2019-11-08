import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ResourcesModule } from './resources';

import { TitlebarModule } from './features/titlebar';
import { ActionbarModule } from './features/actionbar';
import { SidebarModule } from './features/sidebar';
import { ToolbarModule } from './features/toolbar';
import { StreamModule } from './features/stream';

PouchDB.plugin(PouchDBFind);

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    StoreModule.forRoot({ }),
    EffectsModule.forRoot([ ]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 10,
    }),

    AppRoutingModule,

    ResourcesModule,
    TitlebarModule,
    ActionbarModule,
    SidebarModule,
    ToolbarModule,
    StreamModule,
  ],
})
export class AppModule { }
