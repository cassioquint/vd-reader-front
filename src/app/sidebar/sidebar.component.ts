import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Popover } from 'bootstrap';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('title', { static: true }) titleInput!: ElementRef;
  @ViewChild('keywords', { static: true }) keywordsInput!: ElementRef;
  @ViewChild('keywordsInfo', { static: true }) keywordsInfo!: ElementRef;
  @ViewChild('withRegs', { static: true }) withRegsCheckbox!: ElementRef;

  isFilteredByTitle: boolean = false;
  isFilteredByKeywords: boolean = false;
  isFilteredByRegs: boolean = false;

  public ngAfterViewInit(): void {
    this.initializePopover();
    this.applyAllFilters();
  }

  public clearFilters(): void {
    this.titleInput.nativeElement.value = '';
    this.keywordsInput.nativeElement.value = '';
    this.withRegsCheckbox.nativeElement.checked = true;

    this.isFilteredByTitle = false;
    this.isFilteredByKeywords = false;
    this.isFilteredByRegs = true;

    this.applyAllFilters();
  }

  public clearField(id: string): void {

    if (id === "title") {
      this.titleInput.nativeElement.value = '';
      this.isFilteredByTitle = false;
    } else {
      this.keywordsInput.nativeElement.value = '';
      this.isFilteredByKeywords = false;
    }
    
    this.applyAllFilters();
  }

  public filter(id: string): void {
    switch (id) {
      case 'title':
        this.isFilteredByTitle = this.titleInput.nativeElement.value !== '';
        break;
      case 'keywords':
        this.isFilteredByKeywords = this.keywordsInput.nativeElement.value !== '';
        break;
      case 'withRegs':
        this.isFilteredByRegs = this.withRegsCheckbox.nativeElement.checked;
        break;
    }
    this.applyAllFilters();
  }

  private initializePopover(): void {
    const popoverInstance = new Popover(this.keywordsInfo.nativeElement);
    setTimeout(() => popoverInstance.hide(), 5000);
  }

  private applyAllFilters(): void {
    const tableRows = document.querySelectorAll<HTMLElement>('tbody tr');
    const titleInput = this.titleInput.nativeElement.value.toLowerCase();
    const keywordsInput = this.keywordsInput.nativeElement.value.toLowerCase();
    const withRegsCheck = this.withRegsCheckbox.nativeElement.checked;

    tableRows.forEach(row => {
      const titleMatch = this.isFilteredByTitle ? this.filterByTitle(row, titleInput) : true;
      const keywordsMatch = this.isFilteredByKeywords ? this.filterByKeywords(row, keywordsInput) : true;
      const regsMatch = this.isFilteredByRegs ? this.filterByRegs(row, withRegsCheck) : true;

      const isVisible = titleMatch && keywordsMatch && regsMatch;
      this.toggleRowVisibility(row, isVisible);
    });
  }

  private filterByTitle(row: HTMLElement, input: string): boolean {
    const titleCell = row.querySelector('.log-title');
    const titleText = titleCell?.textContent?.toLowerCase() || '';
    return titleText.includes(input);
  }

  private filterByKeywords(row: HTMLElement, input: string): boolean {
    const titleCell = row.querySelector('.log-list');
    const keywordsText = titleCell?.textContent?.toLowerCase() || '';

    if (this.isRegex(input)) {
      const regex = new RegExp(this.removeSlashes(input), 'i');
      return regex.test(keywordsText);
    } else {
      return keywordsText.includes(input);
    }
  }

  private filterByRegs(row: HTMLElement, checked: boolean): boolean {
    const numRegs = Number(row.querySelector('.num-regs')?.textContent || 0);
    return !(checked && numRegs === 0);
  }

  private isRegex(input: string): boolean {
    return /^\/.*\/$/.test(input);
  }

  private removeSlashes(input: string): string {
    return input.replace(/^\/|\/$/g, '');
  }

  private toggleRowVisibility(row: HTMLElement, isVisible: boolean): void {
    row.classList.toggle('hidden', !isVisible);
  }
}
