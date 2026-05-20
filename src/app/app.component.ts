import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeadlineTimerComponent } from './features/deadline-timer/components/deadline-timer/deadline-timer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DeadlineTimerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TaskDeadline';
}
