import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConversationService } from '../../core/services/conversation.service';
import { ConversationEventService } from '../../core/services/conversation-event-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  conversations: any[] = [];
  conversationCreatedSubscription: Subscription;

  @Output() conversationSelected = new EventEmitter<string>();

  constructor(
    private conversationService: ConversationService,
    private conversationEventService: ConversationEventService,
  ) {
    this.conversationCreatedSubscription =
      this.conversationEventService.conversationCreated$.subscribe(
        (conversationId: string) => {
          this.loadConversations(conversationId);
        },
      );
  }

  ngOnInit(): void {
    this.loadConversations();
  }

  ngOnDestroy(): void {
    this.conversationCreatedSubscription.unsubscribe();
  }

  loadConversations(selectedConversationId?: string) {
    this.conversationService.listConversations().subscribe((response) => {
      if (response.success) {
        this.conversations = response.conversations;
        if (selectedConversationId) {
          this.selectConversation(selectedConversationId);
        }
      }
    });
  }

  createConversation() {
    const title = 'New Conversation';
    this.conversationService.createConversation(title).subscribe((response) => {
      if (response.success) {
        this.conversations.unshift(response.conversation);
        this.conversationEventService.notifyConversationCreated(
          response.conversation._id,
        );
      }
    });
  }

  selectConversation(id: string) {
    this.conversationSelected.emit(id);
  }
}
