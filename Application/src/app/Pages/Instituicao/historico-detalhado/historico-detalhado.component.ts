import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoricoService } from '../Services/historico-service/historico.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { InstMenuComponent } from "../shared-menu/inst-menu/inst-menu.component";
import { PictureService } from '../Services/picture-service/picture.service';
import { JogadaDetalhadaDTO } from '../../../Models/JogadaDetalhadaDTO.model';

@Component({
  selector: 'app-historico-detalhado',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, InstMenuComponent],
  templateUrl: './historico-detalhado.component.html',
  styleUrl: './historico-detalhado.component.css'
})
export class HistoricoDetalhadoComponent {
  idCrianca: string = '';
  detalhes: JogadaDetalhadaDTO[] = [];
  historico: JogadaDetalhadaDTO[] = [];

  constructor(private route: ActivatedRoute, private jogadaService: HistoricoService, private pictureService: PictureService ) {}

  ngOnInit(): void {
    this.idCrianca = this.route.snapshot.paramMap.get('id') || '';
    this.carregarDetalhes();
  }

  loadImages(): void {
    this.detalhes.forEach((crianca) => {
      this.pictureService.getFoto(this.idCrianca).subscribe(
        (response) => {
          if (response && response.url) {
            crianca.foto = response.url;
          } else {
            crianca.foto = '../../../assets/user.png';
          }
        },
        (error) => {
          console.error('Erro ao carregar a foto da criança:', error);
          crianca.foto = '../../../assets/user.png';
        }
      );
    });
  }

  carregarDetalhes(): void {
    this.jogadaService.getJogadasPorCrianca(this.idCrianca).subscribe({
      next: (data: JogadaDetalhadaDTO[]) => {
        this.detalhes = data;
        this.loadImages();
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes:', err);
      },
    });
  }
}
