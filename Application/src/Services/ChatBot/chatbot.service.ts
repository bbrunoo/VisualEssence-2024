import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatbotResponse } from '../../app/Models/chatbot.model';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://localhost:5200/Proxy/fazer-pergunta';

  fazerPergunta(pergunta: string): Observable<ChatbotResponse> {
    const body = { pergunta };

    return this.http.post<ChatbotResponse>(this.apiUrl, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
