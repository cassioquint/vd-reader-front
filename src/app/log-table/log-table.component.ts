import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../log.service';

@Component({
  selector: 'app-log-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-table.component.html',
  styleUrl: './log-table.component.css'
})
export class LogTableComponent implements OnInit {
  @Output() logSelected = new EventEmitter<number>();

  logs: any[] = [];
  selectedLogId: number | null = null;
  sortedLogs: any[] = [];
  filteredLogs: any[] = [];
  onlyWithRegs: boolean = false;
  sortColumn: string = ''; 
  sortDirection: boolean = true;

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.logService.getLogs().subscribe((data) => {
      this.logs = data;
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

  filterLogs(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.onlyWithRegs = checkbox.checked;

    if (this.onlyWithRegs) {
      this.filteredLogs = this.logs.filter(log => log.numRegs > 0);
    } else {
      this.filteredLogs = [...this.logs];
    }
  }

  selectLog(log: any) {
    this.selectedLogId = log.id;
    this.logSelected.emit(log);
  }

  setSortIconDirection(col: string, dir: Boolean) {

    // Inicializa todos os ícones
    const sortIcons = document.querySelectorAll<HTMLElement>('.sort-icons')
    sortIcons.forEach(i => {
      i.classList.remove("fa-sort-up")
      i.classList.remove("fa-sort-down")
      i.classList.add("fa-sort")
    })

    // Define o novo ícone conforme direção da ordenação
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
