import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @Output() dateChanged = new EventEmitter<string>();

  currentDate: string = '';

  ngOnInit() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    this.currentDate = `${year}-${month}-${day}`;
  }

  onDateChange(event: any) {
    const selectedDate = event.target.value;
    this.dateChanged.emit(selectedDate);
  }
}
