import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/User_Component/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'cartify', component:WelcomeComponent},
  {path:"registration", component:RegisterComponent},
  {path:"user/home", canActivate:[AuthGuard], component:HomeComponent},
  {path:'**', pathMatch:'full', component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
