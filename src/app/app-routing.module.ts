import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { CardDetailsComponent } from './content/card-details/card-details.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './content/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/my-recommendations',
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
