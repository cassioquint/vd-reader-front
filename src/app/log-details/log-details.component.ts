import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-details.component.html',
  styleUrl: './log-details.component.css'
})
export class LogDetailsComponent {
  @Input() log: any;

  copyToClipboard() {
    if (this.log && this.log.logsList) {
      const logsText = this.log.logsList.join('\n');

      navigator.clipboard.writeText(logsText).then(() => {
        const alert = document.getElementById("alert-box") as HTMLDivElement
        alert.classList.add("alert-show")
        setTimeout(() => {
          alert.classList.remove('alert-show');
        }, 3000);
      }).catch(err => {
        console.error('Erro ao copiar o texto', err);
      });
    }
  }
}