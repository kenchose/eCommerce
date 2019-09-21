import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TrendingComponent } from './components/trending/trending.component';
import { SliderComponent } from './components/slider/slider.component';
import { FeatureComponent } from './components/feature/feature.component';
import { FindstoreComponent } from './components/findstore/findstore.component';
import { EmployyFavoritesComponent } from './components/employy-favorites/employy-favorites.component';
import { EmployeeChoiceComponent } from './components/employee-choice/employee-choice.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/User_Component/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TrendingComponent,
    SliderComponent,
    FeatureComponent,
    FindstoreComponent,
    EmployyFavoritesComponent,
    EmployeeChoiceComponent,
    RegisterComponent,
    HomeComponent,
    PageNotFoundComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [AuthService, HttpService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
