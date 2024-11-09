import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../log.service';
import { UrlGeneratorService } from '../url-generator.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-details.component.html',
  styleUrl: './log-details.component.css'
})
export class LogDetailsComponent implements OnInit, OnDestroy {
  @Input() log!: { title: string; [key: string]: any };

  fileName: string = '';
  private fileSubscription!: Subscription;

  constructor (
    private logService: LogService,
    private urlGeneratorService: UrlGeneratorService
  ) {}

  ngOnInit(): void {
    this.fileSubscription = this.logService.file$.subscribe(
      (file) => (this.fileName = file)
    );
  }

  ngOnDestroy(): void {
    if (this.fileSubscription) {
      this.fileSubscription.unsubscribe();
    }
  }

  goToLine(lineNumber: number): void {
    this.logService.openFile(lineNumber, this.fileName).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error('Error opening file:', err)
    });
  }

  getWikiURL(): string {
    return this.urlGeneratorService.generateWikiUrl(this.log?.title);
  }
}
