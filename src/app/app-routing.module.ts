import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/User_Component/home/home.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { WelcomeComponent } from "./components/Main_Component/welcome/welcome.component";
import { AccountComponent } from "./components/User_Component/account/account.component";
import { AuthGuard } from "./auth.guard";
import { RedirectGuard } from "./redirect.guard";
import { SliderComponent } from "./components/Main_Component/slider/slider.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { PaymentsComponent } from "./components/User_Component/account/payments/payments.component";
import { PersonalComponent } from "./components/User_Component/account/personal/personal.component";
import { SignOutComponent } from "./components/sign-out/sign-out.component";
import { ProductsComponent } from "./components/Product_Component/products/products.component";
import { DetailsComponent } from "./components/Product_Component/details/details.component";
import { CartComponent } from "./components/cart/cart.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { CategoryComponent } from "./components/Product_Component/category/category.component";
// import { NewProductComponent } from "./components/Product_Component/new-product/new-product.component";

const routes: Routes = [
  { path: "cartify", component: WelcomeComponent },
  { path: "registration", component: RegisterComponent },
  { path: "sign-in", component: SignInComponent },
  {
    path: "googleLogin",
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: {
      externalUrl: "/auth/google"
    }
  },
  {
    path: "cartify/home",
    canActivate: [AuthGuard],
    component: HomeComponent
    // children: [
    //   // {path:"user/home/:id", canActivate:[AuthGuard], component:HomeComponent, children:[
    //   { path: "account", component: AccountComponent }
    // ]
  },
  {
    path: "cartify/account",
    canActivate: [AuthGuard],
    component: AccountComponent,
    children: [
      // {
      //   path: "personal/:id",
      //   canActivate: [AuthGuard],
      //   component: PersonalComponent
      // },
      {
        path: "payments/:id",
        canActivate: [AuthGuard],
        component: PaymentsComponent
      }
    ]
  },
  {
    path: "personal/:userId",
    canActivate: [AuthGuard],
    component: PersonalComponent
  },
  { path: "cartify/production", component: SliderComponent },
  { path: "cartify/logoff", component: SignOutComponent },
  {
    path: "cartify/products",
    component: ProductsComponent
    // children: [
    //   {
    //     path: "details/:id",
    //     component: DetailsComponent
    //   }
    // {
    //   path: "new-product",
    //   canActivate: [AuthGuard],
    //   component: NewProductComponent
    // }
    // ]
  },
  {
    path: "cartify/products/details/:id",
    component: DetailsComponent
  },
  { path: "cartify/cart", component: CartComponent },
  { path: "products/:category", component: CategoryComponent },
  { path: "checkout", canActivate: [AuthGuard], component: CheckoutComponent },
  { path: "**", pathMatch: "full", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
