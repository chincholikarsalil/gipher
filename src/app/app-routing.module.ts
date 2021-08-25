import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { CardDetailsComponent } from './content/card-details/card-details.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
