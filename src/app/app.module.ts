import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ToastrModule } from 'ngx-toastr';

import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResourcesModule } from './resources';

import { StreamModule } from './features/stream';
import { TitlebarModule } from './features/titlebar';

PouchDB.plugin(PouchDBFind);

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    StoreModule.forRoot({ }),
    EffectsModule.forRoot([ ]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 100,
    }),

    ToastrModule.forRoot({
      progressBar: true,
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
    }),
    AppRoutingModule,

    ResourcesModule,
    TitlebarModule,
    StreamModule,
  ],
})
export class AppModule { }
