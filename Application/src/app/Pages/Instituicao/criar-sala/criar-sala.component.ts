import { Component, OnInit, reflectComponentType } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OpcCadastComponent } from '../opc-cadast/opc-cadast.component';
import { InstMenuComponent } from "../shared-menu/inst-menu/inst-menu.component";
import { SalasService } from '../Services/salas/salas.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Sala } from '../../../Models/InstituicaoModels/Sala.model';
import { OpcCriarSalaComponent } from "../opc-criar-sala/opc-criar-sala.component";

@Component({
  selector: 'app-criar-sala',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule, OpcCadastComponent, InstMenuComponent, FormsModule, ReactiveFormsModule, OpcCriarSalaComponent],
  templateUrl: './criar-sala.component.html',
  styleUrl: './criar-sala.component.css',
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class CriarSalaComponent {

  showCriarS = true;
  showOpCad = false;

  showCriarSala() {
    this.showCriarS = true;
    this.showOpCad = false;
  }

  showCadastrarCrianca() {
    this.showCriarS = false;
    this.showOpCad = true;
  }

}
