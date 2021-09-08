import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowDown, faArrowUp, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'src/app/card';
import { FavoriteService } from 'src/app/services/favorite.service';
import { FetchService } from 'src/app/services/fetch.service';
import { LoginService } from 'src/app/services/login.service';
import { RecommendService } from 'src/app/services/recommend.service';
import { UserInterestService } from 'src/app/services/user-interest.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  cardArray!: Array<Card>;

  faRecommend = faArrowUp;
  faUnrecommend = faArrowDown;
  faFavorite = faHeart;
  faUnfavorite = faHeartBroken;

  constructor(public fetchService: FetchService,
    public recommendService: RecommendService,
      private router: Router,
        public userInterestService: UserInterestService,
          public loginService: LoginService,
            public favoriteService: FavoriteService) { }

  ngOnInit(): void {
  }

  openCard(id: string) {
    this.router.navigateByUrl('/card-details/' + id).then(
      () => window.location.reload()
    );
  }

}
