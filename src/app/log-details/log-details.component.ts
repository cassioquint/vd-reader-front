import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('mailInfo', { static: true }) mailInfo!: ElementRef;
  @Input() selectedDate: string | undefined = undefined;
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

  fetchMailInfo(bat: string): void {

    const batName = bat.slice(0, bat.indexOf('.')).toLowerCase();
    this.selectedDate = this.selectedDate ?? this.getFormattedDate();
    
    this.logService.fetchMailInfo(batName, this.selectedDate).subscribe({
      next: (data: string[]) => this.logService.setMailInfo(data),
      error: (err) => console.error('Error to get email info: ', err)
    });
  }

  private getFormattedDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
}
