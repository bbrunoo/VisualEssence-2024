import { Component, OnInit } from '@angular/core';
import { MiopiaResult } from '../../../../../Models/MiopiaGame/miopiaResult.model';
import { MiopiaGame } from '../../../../../Models/MiopiaGame/miopiaGame.model';
import { MiopiaGameService } from '../../Services/miopia-game.service';

@Component({
  selector: 'app-miopia-result',
  standalone: true,
  imports: [],
  templateUrl: './miopia-result.component.html',
  styleUrl: './miopia-result.component.css'
})
export class MiopiaResultComponent implements OnInit {



  miopGame: MiopiaGame = {
    idJogo: 1,
    name: 'Miopia',
    score: 0
  };

  result: MiopiaResult;

  constructor(private gameService: MiopiaGameService) {
    this.result = history.state.data;
  }
  ngOnInit(): void {
    if (this.result) {
      this.miopGame.score = this.result.score;
    }
    console.log(this.miopGame);
      this.addNewJogada();
  }

  addNewJogada(): void {
    this.gameService.addJogada(this.miopGame).subscribe(
      response => {
        console.log('Jogada adicionada com sucesso', response);
      },
      error => {
        console.error('Não foi possível adicionar a jogada', error);
      }
    );
  }


}
