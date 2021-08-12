import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavigationComponent } from './sidenavigation/sidenavigation.component';
import { ChannelComponent } from './channel/channel.component';
import { ChannelNewMessageComponent } from './channel/channel-new-message/channel-new-message.component';
import { ChannelContentComponent } from './channel/channel-content/channel-content.component';
import { ChannelHeaderComponent } from './channel/channel-header/channel-header.component';
import { AuthComponent } from './auth/auth.component';
import { DeniedComponent } from './auth/denied/denied.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DmComponent } from './dm/dm.component';
import { DmHeaderComponent } from './dm/dm-header/dm-header.component';
import { DmContentComponent } from './dm/dm-content/dm-content.component';
import { DmNewMessageComponent } from './dm/dm-new-message/dm-new-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavigationComponent,
    ChannelComponent,
    ChannelNewMessageComponent,
    ChannelContentComponent,
    ChannelHeaderComponent,
    AuthComponent,
    DeniedComponent,
    WelcomeComponent,
    DmComponent,
    DmHeaderComponent,
    DmContentComponent,
    DmNewMessageComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
