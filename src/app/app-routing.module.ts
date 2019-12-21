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
import { PaymentsComponent } from "./components/User_Component/payments/payments.component";
import { SignOutComponent } from "./components/sign-out/sign-out.component";
import { ProductsComponent } from "./components/Product_Component/products/products.component";
import { DetailsComponent } from "./components/Product_Component/details/details.component";
import { CartComponent } from "./components/cart/cart.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { CategoryComponent } from "./components/Product_Component/category/category.component";
import { FindstoreComponent } from "./components/findstore/findstore.component";
import { CustomFormComponent } from "./components/custom-form/custom-form.component";
import { SuccessPurchaseComponent } from "./components/User_Component/success-purchase/success-purchase.component";
// import { NewProductComponent } from "./components/Product_Component/new-product/new-product.component";

const routes: Routes = [
  {
    path: "cartify",
    component: WelcomeComponent,
    children: [{ path: "stores", component: FindstoreComponent }]
  },
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
  },
  {
    path: "account/:userId",
    canActivate: [AuthGuard],
    component: AccountComponent,
    children: [
      {
        path: "payments/:id",
        canActivate: [AuthGuard],
        component: PaymentsComponent
      }
    ]
  },
  { path: "cartify/production", component: SliderComponent },
  { path: "cartify/logoff", component: SignOutComponent },
  {
    path: "cartify/products",
    component: ProductsComponent,
    children: [
      {
        path: "details/:id",
        component: DetailsComponent
      },
      {
        path: ":category",
        component: CategoryComponent
      }
    ]
  },
  { path: "cartify/cart", component: CartComponent },
  {
    path: "checkout",
    canActivate: [AuthGuard],
    component: CheckoutComponent,
    children: [
      {
        path: "paymentsuccess",
        canActivate: [AuthGuard],
        component: SuccessPurchaseComponent
      }
    ]
  },
  { path: "", pathMatch: "full", redirectTo: "cartify/products" },
  { path: "**", pathMatch: "full", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
