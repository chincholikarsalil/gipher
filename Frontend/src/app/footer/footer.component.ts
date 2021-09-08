import { Component, OnInit } from '@angular/core';
import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faLinkedIn = faLinkedin;
  faGithub = faGithub;

}
