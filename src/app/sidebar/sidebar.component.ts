import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  filterRows() {
    const titleInput = document.getElementById('title') as HTMLInputElement;
    titleInput.value = "";
    const keywords = document.getElementById('keywords') as HTMLInputElement;
    keywords.value = "";

    const checkbox = document.getElementById('withRegs') as HTMLInputElement;
    const tableRows = document.querySelectorAll<HTMLElement>('tbody tr');

    tableRows.forEach(row => {
      const numRegsCell = row.querySelector('.num-regs') as HTMLElement;
      const numRegs = Number(numRegsCell?.textContent);

      if (checkbox.checked && numRegs === 0) {
        row.classList.add('hidden')
      } else {
        row.classList.remove('hidden')
      }
    });
  }

  filterByTitle() {
    const checkbox = document.getElementById('withRegs') as HTMLInputElement;
    checkbox.checked = false
    const keywords = document.getElementById('keywords') as HTMLInputElement;
    keywords.value = ""

    const titleInput = document.getElementById('title') as HTMLInputElement;
    const filterValue = titleInput.value.toLowerCase();
    const tableRows = document.querySelectorAll<HTMLElement>('tbody tr');

    tableRows.forEach(row => {
      const titleCell = row.querySelector('.log-title');
      const titleText = titleCell?.textContent?.toLowerCase() || '';

      if (titleText.includes(filterValue)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  filterByKeywords() {
    const checkbox = document.getElementById('withRegs') as HTMLInputElement;
    checkbox.checked = false
    const titleInput = document.getElementById('title') as HTMLInputElement;
    titleInput.value = ""

    const keywords = document.getElementById('keywords') as HTMLInputElement;
    const filterValue = keywords.value.toLowerCase();
    const tableRows = document.querySelectorAll<HTMLElement>('tbody tr');

    tableRows.forEach(row => {
      const titleCell = row.querySelector('.log-list');
      const titleText = titleCell?.textContent?.toLowerCase() || '';

      if (titleText.includes(filterValue)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
}
