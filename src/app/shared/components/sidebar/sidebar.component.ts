import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  get tagHistory(): string[] {
    return this.gifsService.tagsHistory;
  }
  onTagSelection(tag: string): void {
    this.gifsService.searchTag(tag);
  }
}
