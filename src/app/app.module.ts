import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { TrendingComponent } from './components/trending/trending.component';
import { SliderComponent } from './components/slider/slider.component';
import { FeatureComponent } from './components/feature/feature.component';
import { FindstoreComponent } from './components/findstore/findstore.component';
import { EmployeeFavComponent } from './components/employee-fav/employee-fav.component';
import { EmployyFavoritesComponent } from './components/employy-favorites/employy-favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    TrendingComponent,
    SliderComponent,
    FeatureComponent,
    FindstoreComponent,
    EmployeeFavComponent,
    EmployyFavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
