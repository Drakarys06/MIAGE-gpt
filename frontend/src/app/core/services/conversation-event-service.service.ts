import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversationEventService {
  private conversationCreatedSource = new Subject<string>();

  conversationCreated$ = this.conversationCreatedSource.asObservable();

  notifyConversationCreated(conversationId: string) {
    this.conversationCreatedSource.next(conversationId);
  }
}
