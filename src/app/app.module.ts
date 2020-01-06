import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { HttpService } from "./http.service";
import { ProductService } from "./product.service";
import { MapsService } from "./maps.service";
import { CartService } from "./cart.service";
import { FormsModule } from "@angular/forms";
// import { AgmCoreModule } from "@agm/core";
import { Ng2SearchPipeModule } from "ng2-search-filter"; //serach module
import { NgxPaginationModule } from "ngx-pagination"; //pagination module github:https://github.com/michaelbromley/ngx-pagination
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angularx-social-login";

import { AppRoutingModule } from "./app-routing.module";
import { TokenInterceptorService } from "./token-interceptor.service";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { TrendingComponent } from "./components/Main_Component/trending/trending.component";
import { SliderComponent } from "./components/Main_Component/slider/slider.component";
import { FeatureComponent } from "./components/Main_Component/feature/feature.component";
import { FindstoreComponent } from "./components/findstore/findstore.component";
import { EmployeeChoiceComponent } from "./components/Main_Component/employee-choice/employee-choice.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/User_Component/home/home.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { WelcomeComponent } from "./components/Main_Component/welcome/welcome.component";
import { AuthGuard } from "./auth.guard";
import { AccountComponent } from "./components/User_Component/account/account.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { PaymentsComponent } from "./components/User_Component/payments/payments.component";
import { SignOutComponent } from "./components/sign-out/sign-out.component";
import { ProductsComponent } from "./components/Product_Component/products/products.component";
import { DetailsComponent } from "./components/Product_Component/details/details.component";
import { CartComponent } from "./components/cart/cart.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { CategoryComponent } from "./components/Product_Component/category/category.component";
import { CustomFormComponent } from "./components/custom-form/custom-form.component";
import { SuccessPurchaseComponent } from "./components/User_Component/success-purchase/success-purchase.component";
import { LoginComponent } from "./components/Social_Login/login/login.component";
import { DashboardComponent } from "./components/Social_Login/dashboard/dashboard.component";
import { PurchasesComponent } from "./components/User_Component/purchases/purchases.component";
import { OrderDetailsComponent } from "./components/User_Component/order-details/order-details.component";
import { SocialProfileComponent } from "./components/social-profile/social-profile.component";
// import { NewProductComponent } from './components/Product_Component/new-product/new-product.component';
export function tokenGetter() {
  return localStorage.getItem("access_token");
}

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      "134152060122-f09p1trrlssi013htgdh0sk8l5kef962.apps.googleusercontent.com"
    )
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("577636242810978")
  }
]);
export function provideConfig() {
  return config;
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
    EmployeeChoiceComponent,
    RegisterComponent,
    HomeComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    AccountComponent,
    SignInComponent,
    PaymentsComponent,
    SignOutComponent,
    ProductsComponent,
    DetailsComponent,
    CartComponent,
    CheckoutComponent,
    CategoryComponent,
    CustomFormComponent,
    SuccessPurchaseComponent,
    LoginComponent,
    DashboardComponent,
    PurchasesComponent,
    OrderDetailsComponent,
    SocialProfileComponent
    // NewProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    SocialLoginModule
    // AgmCoreModule.forRoot({
    //   apiKey: "AIzaSyDP0qix8TUVIvQmlBwvR0-uGfQyVwHuxQs"
    // })
  ],
  providers: [
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    HttpService,
    CartService,
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
