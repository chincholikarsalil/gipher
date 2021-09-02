import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowDown, faArrowUp, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../../card';
import { FetchService } from '../../services/fetch.service';
import { RecommendService } from '../../services/recommend.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  card!: Card;

  faRecommend = faArrowUp;
  faUnrecommend = faArrowDown;
  faFavorite = faHeart;
  faUnfavorite = faHeartBroken;

  constructor(
    public recommendService: RecommendService,
    private fetchService: FetchService,
    private router: Router) {
    this.load();
  }

  ngOnInit(): void {
    document.getElementById('details')!.style.display = 'none';
    setTimeout(() => { document.getElementById('preloader')!.style.display = 'none'; }, 500);
    setTimeout(() => { document.getElementById('details')!.style.display = 'block'; }, 500);
  }

  load() {
    this.fetchService.searchId = window.location.href.split('/')[window.location.href.split('/').length - 1];
    this.fetchService.searchById.subscribe(
      data => {
        console.log(data)
        this.card = new Card(data.id, data.title, data.imgUrl);
      },
      error => {
        console.log(error.message);
        this.router.navigateByUrl("/page-not-found");
      }
    )
  }
}
