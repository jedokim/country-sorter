import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class HubService {
  title = 'hubSpot-app';

  constructor(private http: HttpClient) {
  }

  getDataFromHubSpot() {
      return this.http.get('https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=68af7dfbb7a36083f961399d98e2');
  }

  sendDataToHubspot(data: any) {
      data = null;
      return this.http.post('https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=68af7dfbb7a36083f961399d98e2', data).subscribe (
          res => {
              console.log('success');
          }, error => {
              console.error(error);
          }
      );
  }

}
