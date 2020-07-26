import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthModule } from  './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NoteAddPage } from './note-add/note-add.page';
import { NoteDetailPage } from './note-detail/note-detail.page';
import { DetailEventPage } from './detail-event/detail-event.page';
import { KonfirmasiPage } from './konfirmasi/konfirmasi.page';
import { ReminderPage } from './reminder/reminder.page';
import { FCM } from '@ionic-native/fcm/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx'; 


@NgModule({
  declarations: [AppComponent, NoteAddPage,NoteDetailPage,DetailEventPage,KonfirmasiPage, ReminderPage],
  entryComponents: [NoteAddPage, NoteDetailPage,DetailEventPage,KonfirmasiPage, ReminderPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  HttpClientModule,AuthModule,
  FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    Push,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
