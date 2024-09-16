import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoMenuComponent } from "../../../SharedMenu/logo-menu/logo-menu.component";
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-miopia-instructions',
  standalone: true,
  imports: [RouterLink, LogoMenuComponent],
  templateUrl: './miopia-instructions.component.html',
  styleUrl: './miopia-instructions.component.css',
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class MiopiaInstructionsComponent {

}
