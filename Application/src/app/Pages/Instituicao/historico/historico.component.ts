import { Component } from '@angular/core';
import { InstMenuComponent } from "../shared-menu/inst-menu/inst-menu.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [InstMenuComponent, RouterLink],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent {

}
