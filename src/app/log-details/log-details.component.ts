import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../log.service';
import { UrlGeneratorService } from '../url-generator.service'

@Component({
  selector: 'app-log-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-details.component.html',
  styleUrl: './log-details.component.css'
})
export class LogDetailsComponent implements OnInit {
  @Input() log: any;

  fileName: string = '';

  constructor(private logService: LogService, private urlGeneratorService: UrlGeneratorService) {}

  ngOnInit(): void {
    this.logService.file$.subscribe(file => {
      this.fileName = file;
    });
  }

  goToLine(lineNumber: number): void {
    this.logService.openFile(lineNumber, this.fileName).subscribe((data) => {
      console.log(data)
    });
  }

  getWikiURL(): string {
    return this.urlGeneratorService.generateWikiUrl(this.log?.title);
  }
}
