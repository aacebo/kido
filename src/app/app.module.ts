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
import { ResourcesModule } from './resources';
import { CoreModule } from './core';

import { StreamModule } from './features/stream';
import { TitlebarModule } from './features/titlebar';
import { HotkeysModule } from './features/hotkeys';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

PouchDB.plugin(PouchDBFind);

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    EffectsModule.forRoot([ ]),
    StoreModule.forRoot({ }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 100,
    }),

    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
      timeOut: 3000,
      maxOpened: 5,
      autoDismiss: true,
      countDuplicates: true,
    }),

    AppRoutingModule,
    ResourcesModule,
    CoreModule,

    TitlebarModule,
    StreamModule,
    HotkeysModule,
  ],
})
export class AppModule { }
