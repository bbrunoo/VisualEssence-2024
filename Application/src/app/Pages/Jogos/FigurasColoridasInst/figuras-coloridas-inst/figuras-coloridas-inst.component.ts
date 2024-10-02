import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { preload } from '../../../../Pages/Jogos/FigurasColoridasInst/config/preload'
import { create } from '../../../../Pages/Jogos/FigurasColoridasInst/config/create';
import { LogoMenuComponent } from "../../../SharedMenu/logo-menu/logo-menu.component";
import { LogoMenuInstComponent } from "../../../SharedMenu/logo-menu-inst/logo-menu-inst.component";

@Component({
  selector: 'app-figuras-coloridas-inst',
  standalone: true,
  imports: [LogoMenuComponent, LogoMenuInstComponent],
  templateUrl: './figuras-coloridas-inst.component.html',
  styleUrl: './figuras-coloridas-inst.component.css'
})
export class FigurasColoridasInstComponent implements OnInit {
  private game!: Phaser.Game;

  ngOnInit(): void {
    this.startGame();
  }

  private startGame(): void {
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 250,
      height: 250,
      scene: {
        preload: preload,
        create: create,
      },
      parent: 'game',
    });
  }
}
