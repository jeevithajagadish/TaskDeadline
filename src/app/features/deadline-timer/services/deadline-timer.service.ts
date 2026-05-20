import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, map, Observable, startWith, switchMap, takeWhile } from 'rxjs';
import { DeadlineTimerResponse } from '../models/deadline-response.model';

@Injectable({
  providedIn: 'root'
})
export class DeadlineTimerService {

  // The URl in real project should be moved to environment variable or configuration file
  // private readonly apiURL = '/api/deadline';
  // created a dummy API for testing purpose
  private readonly apiURL = 'https://dummyjson.com/c/ecdd-86c0-4a9c-a6c0';
  constructor(private http: HttpClient) { }

  getTimeLeftInSeconds(): Observable<number> {
    return this.http.get<DeadlineTimerResponse>(this.apiURL).pipe(
      switchMap((response) => {
        const secondsLeft = Math.max(response.secondsLeft, 0);
        const deadlineTime = Date.now() + secondsLeft * 1000;
        return interval(1000).pipe(
          startWith(0),
          map(() => {
            const timeLeft = Math.round((deadlineTime - Date.now()) / 1000);
            return Math.max(timeLeft, 0);
      }),
          takeWhile((value) => value >= 0)
        );
      })
    );
  }
}
