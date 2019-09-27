import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/User_Component/home/home.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AccountComponent } from "./components/User_Component/account/account.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: "cartify", component: WelcomeComponent },
  { path: "registration", component: RegisterComponent },
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
    path: "cartify/account/:id",
    canActivate: [AuthGuard],
    component: AccountComponent
  },
  { path: "**", pathMatch: "full", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
