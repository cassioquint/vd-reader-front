import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LogTableComponent } from './log-table/log-table.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LogDetailsComponent } from './log-details/log-details.component';
import { ModalMailComponent } from './modal-mail/modal-mail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    LogTableComponent,
    LogDetailsComponent,
    ModalMailComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;

  title = 'vd-reader';
  selectedLog: any = null;
  selectedDate: string | undefined = undefined;

  onLogSelected(log: any) {
    this.selectedLog = log;
  }

  onDateChange(date: string) {
    this.selectedDate = date;

    if (this.sidebarComponent) {
      this.sidebarComponent.clearFilters();
    }
  }
}
