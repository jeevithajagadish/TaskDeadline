import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, interval, map, Observable, of, retry, startWith, switchMap, takeWhile } from 'rxjs';
import { DeadlineTimerResponse } from '../models/deadline-response.model';

@Injectable({
  providedIn: 'root'
})
export class DeadlineTimerService {

  // The URl in real project should be moved to environment variable or configuration file
  // private readonly apiURL = '/api/deadline';
  // created a dummy API for testing purpose
  // private readonly apiURL = 'https://dummyjson.com/c/6e3a-1fde-49a7-8a5d'; // 0 seconds left, change it to test different scenarios
  private readonly apiURL = 'https://dummyjson.com/c/ecdd-86c0-4a9c-a6c0';
  constructor(private http: HttpClient) { }

  getTimeLeftInSeconds(): Observable<DeadlineTimerResponse> {
    return this.http.get<DeadlineTimerResponse>(this.apiURL).pipe(
      retry({ count: 3, delay: 2000 }),
      switchMap((response) => {
        const secondsLeft = Math.max(response.secondsLeft, 0);
        const deadlineTime = Date.now() + secondsLeft * 1000;
        return interval(1000).pipe(
          startWith(0),
          map(() => {
            const timeLeft = Math.ceil((deadlineTime - Date.now()) / 1000);
            return { secondsLeft: Math.max(timeLeft, 0) };
      }),
          takeWhile((value) => value.secondsLeft > 0, true)
        );
      }),
      catchError((error) => {
      console.error('Failed to get time left after 3 retries', error);
      return of({ secondsLeft: -1 });
    })
    );
  }
}
