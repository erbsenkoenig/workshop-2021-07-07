import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Flight } from '../entities/entities';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FlightService {
  constructor(private readonly httpClient: HttpClient) {
    console.log('flight service created');

    // const test = this.search('BERLIN').pipe(shareReplay(1));
    //
    // test.subscribe();
    // test.subscribe();
    // test.subscribe();
  }

  search(from: string, to: string): Observable<Flight[]> {
    const url = 'http://www.angular.at/api/flight';

    const headers = new HttpHeaders().set('Accept', 'application/json');

    const params = new HttpParams().set('from', from).set('to', to);

    return this.httpClient.get<Flight[]>(url, { headers, params });
  }

  load(from: string): Observable<Flight[]> {
    const url = 'http://www.angular.at/api/flight';

    const headers = new HttpHeaders().set('Accept', 'application/json');

    const params = new HttpParams().set('from', from);

    return this.httpClient.get<Flight[]>(url, { headers, params });
  }

  getById(id: string): Observable<Flight> {
    const url = 'http://www.angular.at/api/flight';

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.httpClient.get<Flight>(`${url}/${id}`, { headers });
  }
}
