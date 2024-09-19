import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vlibras',
  standalone: true,
  imports: [],
  templateUrl: './vlibras.component.html',
  styleUrl: './vlibras.component.css'
})
export class VlibrasComponent implements OnInit {
  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.onload = () => {
      new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
    };
    document.body.appendChild(script);
  }
}
