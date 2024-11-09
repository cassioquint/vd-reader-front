import { Component, AfterViewInit, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../log.service';
@Component({
  selector: 'app-log-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-table.component.html',
  styleUrl: './log-table.component.css'
})
export class LogTableComponent implements AfterViewInit {
  @Input() selectedDate: string | undefined = undefined;
  @Output() logSelected = new EventEmitter<any>();

  logs: any[] = [];
  selectedLogId: number = 0;
  sortedLogs: any[] = [];
  filteredLogs: any[] = [];
  onlyWithRegs: boolean = false;
  sortColumn: string = ''; 
  sortDirection: boolean = true;

  constructor(private logService: LogService) {}

  ngAfterViewInit(): void {
    this.fetchLogs();
  }

  ngOnChanges(): void {
    if (this.selectedDate) {
      this.fetchLogs();
    }
    this.selectLog("")
  }

  fetchLogs(): void {
    this.logService.getLogs(this.selectedDate).subscribe();

    this.logService.logs$.subscribe((logData) => {
      this.logs = logData;
      this.sortedLogs = [...this.logs];
    });
  }

  sort(column: string) {
    this.sortDirection = !this.sortDirection;

    this.setSortIconDirection(column, this.sortDirection)

    this.sortedLogs.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if (valA < valB) {
        return this.sortDirection ? -1 : 1; 
      }
      if (valA > valB) {
        return this.sortDirection ? 1 : -1;
      }
      return 0;
    });
  }

  selectLog(log: any) {
    this.selectedLogId = log.id;
    this.logSelected.emit(log);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Home':
        this.navigateToFirstLog();
        event.preventDefault();
        break;
      case 'End':
        this.navigateToLastLog();
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.navigateByArrow(-1);
        event.preventDefault();
        break;
      case 'ArrowDown':
        this.navigateByArrow(1);
        event.preventDefault();
        break;
    }
  }

  private navigateToFirstLog() {
    this.selectedLogId = 1;
    this.selectLog(this.logs[0]);
  }

  private navigateToLastLog() {
    this.selectedLogId = this.logs.length -1;
    this.selectLog(this.logs[this.selectedLogId -1]);
  }

  private navigateByArrow(direction: number) {
    if (!this.selectedLogId) {
      this.navigateToFirstLog();
    } else {
      this.navigateLog(direction);
    }
  }

  private navigateLog(direction: number) {
    const newIndex = this.selectedLogId + direction;
    if (newIndex >= 0 && newIndex < this.logs.length) {
      this.selectLog(this.logs[newIndex - 1]);
    }
  }

  setSortIconDirection(col: string, dir: boolean) {
    const sortIcons = document.querySelectorAll<HTMLElement>('.sort-icons')
    sortIcons.forEach(i => {
      i.classList.remove("fa-sort-up")
      i.classList.remove("fa-sort-down")
      i.classList.add("fa-sort")
    })

    const icoColumn = document.getElementById("sort-" + col) as HTMLElement
    icoColumn.classList.remove("fa-sort")
    if(dir) {
      icoColumn.classList.remove("fa-sort-down")
      icoColumn.classList.add("fa-sort-up")
    } else {
      icoColumn.classList.remove("fa-sort-up")
      icoColumn.classList.add("fa-sort-down")
    }
  }
}