import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { CardDetailsComponent } from './content/card-details/card-details.component';
import { LoginComponent } from './content/login/login.component';
import { PageNotFoundComponent } from './content/page-not-found/page-not-found.component';
import { ProfileComponent } from './content/profile/profile.component';
import { RegistrationComponent } from './content/registration/registration.component';
import { ProfileSettingsComponent } from './content/profile/profile-settings/profile-settings.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { SearchComponent } from './content/search/search.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { 
    path: 'my-recommendations',
    component: ContentComponent
  },
  {
    path: 'card-details/:id',
    component: CardDetailsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'profile/settings',
    component: ProfileSettingsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
