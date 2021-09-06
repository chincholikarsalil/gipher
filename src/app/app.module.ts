import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { SearchComponent } from './content/search/search.component';
import { RecommendationComponent } from './content/recommendation/recommendation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TrendingComponent } from './content/trending/trending.component';
import { CardComponent } from './content/card/card.component';
import { CardDetailsComponent } from './content/card-details/card-details.component';
import { CommentsComponent } from './content/card-details/comments/comments.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './content/login/login.component';
import { PageNotFoundComponent } from './content/page-not-found/page-not-found.component';
import { ProfileComponent } from './content/profile/profile.component';
import { RegistrationComponent } from './content/registration/registration.component';
import { ProfileSettingsComponent } from './content/profile/profile-settings/profile-settings.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { FavoritesComponent } from './content/favorites/favorites.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    SearchComponent,
    RecommendationComponent,
    TrendingComponent,
    CardDetailsComponent,
    CommentsComponent,
    FooterComponent,
    CardComponent,
    LoginComponent,
    PageNotFoundComponent,
    ProfileComponent,
    RegistrationComponent,
    ProfileSettingsComponent,
    DashboardComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
