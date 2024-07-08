import { ContatoServiceService } from '../../../Services/Contato/contato-service.service';
import { Component, OnInit } from '@angular/core';
import { ContatoModel } from '../../Models/ContatoEntitie/contGet.model';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-contato',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule, RouterLink],
  templateUrl: './admin-contato.component.html',
  styleUrl: './admin-contato.component.css'
})
export class AdminContatoComponent {
  apiUrlGet = 'https://localhost:7063/api/Contato/ListaContatos';

  public data:any;

  feedbacks: ContatoModel[] = [];

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getFeedback();
  }
  getFeedback() {
    this.http.get(this.apiUrlGet).subscribe((response: any) => {
      console.log(response);
      this.data = response;
    });
  }

  }

