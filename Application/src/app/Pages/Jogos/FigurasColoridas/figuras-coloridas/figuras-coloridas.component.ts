import { Component, OnInit } from '@angular/core';
import { LogoMenuComponent } from '../../../SharedMenu/logo-menu/logo-menu.component';
import { preload } from '../../../../Pages/Jogos/FigurasColoridas/config/preload'
import { create } from '../../../../Pages/Jogos/FigurasColoridas/config/create';


@Component({
  selector: 'app-figuras-coloridas',
  standalone: true,
  imports: [LogoMenuComponent],
  templateUrl: './figuras-coloridas.component.html',
  styleUrl: './figuras-coloridas.component.css'
})
export class FigurasColoridasComponent implements OnInit {
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
