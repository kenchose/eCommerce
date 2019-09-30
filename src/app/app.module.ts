import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { HttpService } from "./http.service";
import { ProductService } from "./product.service";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { TokenInterceptorService } from "./token-interceptor.service";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { TrendingComponent } from "./components/trending/trending.component";
import { SliderComponent } from "./components/slider/slider.component";
import { FeatureComponent } from "./components/feature/feature.component";
import { FindstoreComponent } from "./components/findstore/findstore.component";
import { EmployyFavoritesComponent } from "./components/employy-favorites/employy-favorites.component";
import { EmployeeChoiceComponent } from "./components/employee-choice/employee-choice.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/User_Component/home/home.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AuthGuard } from "./auth.guard";
import { AccountComponent } from "./components/User_Component/account/account.component";
export function tokenGetter() {
  return localStorage.getItem("access_token");
}
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
    AccountComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    AuthService,
    HttpService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
