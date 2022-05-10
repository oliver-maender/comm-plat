var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"channel/:name","component":"ChannelComponent","canActivate":["AuthGuard"]},{"path":"dm/:user","component":"DmComponent","canActivate":["AuthGuard"]},{"path":"data-privacy","component":"DataPrivacyComponent"},{"path":"legal-notice","component":"LegalNoticeComponent"},{"path":"auth","component":"AuthComponent","canActivate":["NoAuthGuard"]},{"path":"","component":"WelcomeComponent","canActivate":["AuthGuard"]},{"path":"**","redirectTo":""}],"kind":"module"}]}
