import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {path:'', component:WelcomeComponent},
  {path:"registration", component:RegisterComponent},
  {path:"user/home", component:UserHomeComponent},
  {path:"user/welcome", component:WelcomeComponent},
  {path:'**', pathMatch:'full', component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
