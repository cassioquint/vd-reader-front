import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LogService } from '../log.service';

@Component({
  selector: 'app-modal-mail',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './modal-mail.component.html',
  styleUrl: './modal-mail.component.css'
})
export class ModalMailComponent implements OnInit, OnDestroy {
  mailInfoData: string[] = [];

  private subscription!: Subscription;

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.subscription = this.logService.mailInfo$.subscribe((data) => {
      this.mailInfoData = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  clearMailInfo(): void {
    this.mailInfoData = [];
  }
}
