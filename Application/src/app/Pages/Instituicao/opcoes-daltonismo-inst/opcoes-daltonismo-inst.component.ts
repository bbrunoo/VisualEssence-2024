import { Component } from '@angular/core';
import { LogoMenuInstComponent } from "../../SharedMenu/logo-menu-inst/logo-menu-inst.component";
import { InstMenuComponent } from "../shared-menu/inst-menu/inst-menu.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-opcoes-daltonismo-inst',
  standalone: true,
  imports: [InstMenuComponent, RouterLink],
  templateUrl: './opcoes-daltonismo-inst.component.html',
  styleUrl: './opcoes-daltonismo-inst.component.css'
})
export class OpcoesDaltonismoInstComponent {
}
