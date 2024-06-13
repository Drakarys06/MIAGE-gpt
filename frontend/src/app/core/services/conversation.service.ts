import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private endpointURL = 'http://localhost:3001/api/conversations';

  constructor(private http: HttpClient) {}

  saveConversation(messages: any[]): Observable<any> {
    return this.http.post<any>(`${this.endpointURL}/save`, { messages });
  }

  loadConversation(): Observable<any> {
    return this.http.get<any>(`${this.endpointURL}/load`);
  }
}
