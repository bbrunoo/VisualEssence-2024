import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgIf, CommonModule, NgClass } from '@angular/common';
import { InstMenuComponent } from '../../shared-menu/inst-menu/inst-menu.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home-game-section',
  standalone: true,
  imports: [InstMenuComponent, NgClass,NgIf, CommonModule, FormsModule, RouterLink],
  templateUrl: './home-game-section.component.html',
  styleUrl: './home-game-section.component.css'
})
export class HomeGameSectionComponent {
  Dalt: string = '../../../assets/HomeImages/daltonismo.png';
  Miop: string = '../../../assets/HomeImages/miopia.png';

  showNew = false;

  toggleContent() {
    this.showNew = !this.showNew;
  }

 
}
