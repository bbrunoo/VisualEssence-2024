import { Component } from '@angular/core';
import { HeaderComponent } from "../Shared-Pais/header/header.component";
import { DoeInfoComponent } from "../doe-info/doe-info.component";
import { SobreComponent } from '../sobre/sobre.component';
import { JogosComponent } from "../jogos/jogos.component";
import { FooterComponent } from "../Shared-Pais/footer/footer.component";
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";
import { VlibrasComponent } from "../../vlibras/vlibras.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, DoeInfoComponent, SobreComponent, JogosComponent, FooterComponent, LogoMenuComponent, VlibrasComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
