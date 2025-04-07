import { NgStyle } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, NgStyle],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @ViewChild('progressFill') progressBar!: ElementRef;

  statusName = '';
  statusColor = {};
  isLoading = true;

  @Input() set statusIndicator(value: string) {
    this.setStatus(value);
  }

  setStatus(status: string) {
    switch (status) {
      case 'error':
        this.setStatusColor('#ff1313')
        break;
      case 'pending':
        this.setStatusColor('#f5f50d')
        break;
      case 'success':
        this.setStatusColor('#0cf30c')
        break;
      default:
        break;
    }
  }

  setStatusColor(color: string) {
    this.statusColor = {
      'background-color': color
    }
  }
}
