import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../log.service';

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
  ranegao: string = '';

  constructor(private logService: LogService) {}

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
    let urlBase = "http://intranet/wiki/index.php/Verifica%C3%A7%C3%A3o_di%C3%A1ria_dos_fontes_do_SIGER";
    let subtitle = this.log ? encodeURIComponent(this.log.title.replace(/ /g, '_')) : '';
    return `${urlBase}#${subtitle}`
  }
}