import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './gifs-search-box.component.html',
  styleUrl: './gifs-search-box.component.css',
})
export class GifsSearchBoxComponent {
  constructor(private gifsService: GifsService) {}
  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>;
  searchTag(): void {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
