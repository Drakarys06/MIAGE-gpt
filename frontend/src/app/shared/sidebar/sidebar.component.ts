import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConversationService } from '../../core/services/conversation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  conversations: any[] = [];
  newTitle: number = 0;

  @Output() conversationSelected = new EventEmitter<string>();

  constructor(private conversationService: ConversationService) {}

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations() {
    this.conversationService.listConversations().subscribe((response) => {
      if (response.success) {
        this.conversations = response.conversations;
      }
    });
  }

  createConversation() {
    this.conversationService
      .createConversation(this.newTitle++)
      .subscribe((response) => {
        if (response.success) {
          this.conversations.push(response.conversation);
        }
      });
  }

  selectConversation(id: string) {
    this.conversationSelected.emit(id);
  }
}
