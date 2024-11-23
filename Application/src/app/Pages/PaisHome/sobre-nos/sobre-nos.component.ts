import { Component } from '@angular/core';
import { FooterComponent } from '../Shared-Pais/footer/footer.component';
import { LogoMenuComponent } from '../../SharedMenu/logo-menu/logo-menu.component';

@Component({
  selector: 'app-sobre-nos',
  standalone: true,
  imports: [FooterComponent, LogoMenuComponent],
  templateUrl: './sobre-nos.component.html',
  styleUrl: './sobre-nos.component.css'
})
export class SobreNosComponent {

}
