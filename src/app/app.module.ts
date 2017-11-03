import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, HttpModule} from '@angular/http';
import {routing} from './app.routing';

// components
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AlertComponent} from './alert/alert.component';

// guards
import {AuthGuard} from './guards/auth.guard';
import {LoginGuard} from './guards/login.guard';

// services
import {AlertService} from './core/services/alert.service';
import {AuthenticationService} from './core/services/authentication.service';
import {UserService} from './core/services/user.service';

// helpers
import {fakeBackendProvider} from './core/helpers/fake-backend.helper';
import {CoreModule} from './core/core.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    routing
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    AlertService,
    AuthenticationService,
    UserService,

    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
