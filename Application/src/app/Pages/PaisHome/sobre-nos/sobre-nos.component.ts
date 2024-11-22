import { Component } from '@angular/core';
import { LogoMenuComponent } from '../../SharedMenu/logo-menu/logo-menu.component';
import { FooterComponent } from '../Shared-Pais/footer/footer.component';

@Component({
  selector: 'app-sobre-nos',
  standalone: true,
  imports: [LogoMenuComponent, FooterComponent],
  templateUrl: './sobre-nos.component.html',
  styleUrl: './sobre-nos.component.css'
})
export class SobreNosComponent {

}
