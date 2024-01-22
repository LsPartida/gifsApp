import { Component, Input, OnInit } from '@angular/core';
import {
  Rating,
  SourceTLD,
  Type,
  gif,
} from '../../interfaces/giphyResponse.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrl: './gifs-card.component.css',
})
export class GifsCardComponent implements OnInit {
  @Input()
  public gif!: gif;

  ngOnInit(): void {
    if (!this.gif) {
      throw new Error('Gif property is required');
    }
  }
}
