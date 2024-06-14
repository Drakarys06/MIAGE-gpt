import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private endpointURL = 'http://localhost:3001/api/conversations';

  constructor(private http: HttpClient) {}

  createConversation(title: number): Observable<any> {
    return this.http.post<any>(`${this.endpointURL}/create`, { title });
  }

  saveConversation(id: string, messages: any[]): Observable<any> {
    return this.http.post<any>(`${this.endpointURL}/save`, { id, messages });
  }

  loadConversation(id: string): Observable<any> {
    return this.http.get<any>(`${this.endpointURL}/load/${id}`);
  }

  listConversations(): Observable<any> {
    return this.http.get<any>(`${this.endpointURL}/list`);
  }

  getLastConversation(): Observable<any> {
    return this.http.get<any>(`${this.endpointURL}/last`);
  }
}
