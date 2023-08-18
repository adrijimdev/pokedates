import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SwipeComponent } from './components/swipe/swipe.component';
import { LikesComponent } from './components/likes/likes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SwipeComponent,
    LikesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
