import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OrganizationComponent} from './setups/system/organization/organization.component';
import {LoginComponent} from './login/login.component';
import {ParametersComponent} from './setups/system/parameters/parameters/parameters.component';
import {SequencesComponent} from './setups/system/sequences/sequences.component';

const routes: Routes = [
  { path: '' , component: LoginComponent},
  { path: 'home' , component: HomeComponent },
  { path: 'organization' , component: OrganizationComponent},
  { path: 'parameters' , component: ParametersComponent},
  { path: 'sequences' , component: SequencesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
