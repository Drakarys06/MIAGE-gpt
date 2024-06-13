import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GptService {
  private endpointURL = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getChatResponse(prompt: string): Observable<any> {
    const formData = new FormData();
    formData.append('prompt', prompt);
    return this.http.post<any>(`${this.endpointURL}/chat`, formData);
  }

  getImage(prompt: string): Observable<any> {
    const formData = new FormData();
    formData.append('prompt', prompt);
    return this.http.post<any>(`${this.endpointURL}/image`, formData);
  }

  getVoice(prompt: string): Observable<any> {
    const formData = new FormData();
    formData.append('prompt', prompt);
    return this.http.post(`${this.endpointURL}/speech`, formData, {
      responseType: 'blob',
    });
  }
}
