import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { NoAuthGuard } from './auth/no-auth.guard';
import { ChannelComponent } from './channel/channel.component';
import { DataPrivacyComponent } from './data-privacy/data-privacy.component';
import { DmComponent } from './dm/dm.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'channel/:name', component: ChannelComponent, canActivate: [AuthGuard] },
  { path: 'dm/:user', component: DmComponent, canActivate: [AuthGuard] },
  { path: 'data-privacy', component: DataPrivacyComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: 'auth', component: AuthComponent, canActivate: [NoAuthGuard] },
  { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
