import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../log.service';

@Component({
  selector: 'app-log-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-details.component.html',
  styleUrl: './log-details.component.css'
})
export class LogDetailsComponent {
  @Input() log: any;

  constructor(private logService: LogService) {}

  goToLine(lineNumber: number): void {
    
    this.logService.openFile(lineNumber).subscribe((data) => {
      console.log(data)
    });
  }
}