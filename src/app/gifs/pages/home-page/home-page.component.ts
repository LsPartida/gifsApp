import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { gif } from '../../interfaces/giphyResponse.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  constructor(private gifsService: GifsService) {}
  get gifs(): gif[] {
    return this.gifsService.gifList;
  }
}
