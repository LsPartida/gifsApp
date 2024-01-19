import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GiphyResponse, gif } from '../interfaces/giphyResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistory: string[] = [];
  private baseUrl: string = 'http://api.giphy.com/v1/gifs/';
  public gifList: gif[] = [];

  constructor(private httpClient: HttpClient) {
    this.loadLocalStorage();
    if (this._tagsHistory.length === 0) {
      return;
    }
    this.searchTag(this._tagsHistory[0]);
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem(`history`, JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) {
      return;
    }
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
  }

  public searchTag(tag: string): void {
    const { GIPHY_KEY } = environment;

    if (tag == '') {
      return;
    }
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', GIPHY_KEY)
      .set('limit', 10)
      .set('q', tag);
    this.httpClient
      .get<GiphyResponse>(`${this.baseUrl}search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
      });
  }

  // public searchTag(tag: string): Promise<void> | void {
  //   if (tag == '') {
  //     return;
  //   }
  //   this.organizeHistory(tag);
  //   const { GIPHY_KEY } = environment;

  //   return fetch(
  //     `http://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${tag}&limit=10`
  //   )
  //     .then((resp) => resp.json())
  //     .then((data) => data);
  // }
}
