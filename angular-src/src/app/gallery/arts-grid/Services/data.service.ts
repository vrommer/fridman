import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  private _apiUrl: string;
  private _currentType: string;

  constructor(private httpClient: HttpClient) {
    this._apiUrl = `http://34.71.187.78:80/api`;
  }

  getArtifacts(type: string, lastId: string) {
    const inputParam = type ? type : 'drawings',
        urlStr = lastId ? `${this._apiUrl}/${inputParam}/page/${lastId}` : `${this._apiUrl}/${inputParam}`;
    if (inputParam !== this._currentType) {
      this._currentType = inputParam;
    }
    return this.httpClient.jsonp(urlStr, 'callback');
  }

  ngOnDestroy(): void {
  }
}
