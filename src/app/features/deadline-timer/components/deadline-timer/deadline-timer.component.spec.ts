import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { HttpClient } from '@angular/common/http';

import { DeadlineTimerComponent } from './deadline-timer.component';

describe('DeadlineTimerComponent', () => {
  let component: DeadlineTimerComponent;
  let fixture: ComponentFixture<DeadlineTimerComponent>;

  beforeEach(async () => {
    const mockHttpClient = {
      get: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [DeadlineTimerComponent]
      ,providers: [{ provide: HttpClient, useValue: mockHttpClient }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeadlineTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
