import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LogTableComponent } from './log-table/log-table.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LogDetailsComponent } from './log-details/log-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    LogTableComponent,
    LogDetailsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vd-reader';
  selectedLog: any = null;
  selectedDate: string | undefined = undefined;

  onLogSelected(log: any) {
    this.selectedLog = log;
  }

  onDateChange(date: string) {
    this.selectedDate = date;
  }
}
