import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DeadlineTimerService } from '../../services/deadline-timer.service';
import { DeadlineTimerResponse } from '../../models/deadline-response.model';

@Component({
  selector: 'app-deadline-timer',
  imports: [AsyncPipe],
  templateUrl: './deadline-timer.component.html',
  styleUrl: './deadline-timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeadlineTimerComponent {
  countdown$: Observable<DeadlineTimerResponse>;

  constructor(private deadlineTimerService: DeadlineTimerService) {
    this.countdown$ = this.deadlineTimerService.getTimeLeftInSeconds();
  }
}
