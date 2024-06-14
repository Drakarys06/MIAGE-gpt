import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConversationService } from '../../core/services/conversation.service';
import { GptService } from '../../core/services/gpt.service';
import { ConversationEventService } from '../../core/services/conversation-event-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  prompt: string = '';
  conversation: { sender: string; message: string | SafeHtml }[] = [];
  currentConversationId: string = '';

  constructor(
    private conversationService: ConversationService,
    private gptService: GptService,
    private sanitizer: DomSanitizer,
    private conversationEventService: ConversationEventService,
  ) {}

  ngOnInit(): void {
    this.loadLastConversation();
  }

  loadLastConversation() {
    this.conversationService.getLastConversation().subscribe((response) => {
      if (response.success && response.conversation) {
        this.currentConversationId = response.conversation._id;
        this.conversation = response.conversation.messages.map((msg: any) => ({
          ...msg,
          message: this.sanitizer.bypassSecurityTrustHtml(msg.message),
        }));
      } else {
        this.createNewConversationAndLoad();
      }
    });
  }

  createNewConversationAndLoad() {
    const title = 'Chat' + Math.floor(Math.random() * 1000);
    this.conversationService.createConversation(title).subscribe((response) => {
      if (response.success) {
        this.currentConversationId = response.conversation._id;
        this.conversation = [];
        this.saveConversation();
        this.conversationEventService.notifyConversationCreated(
          this.currentConversationId,
        ); // Notify the sidebar about the new conversation
      }
    });
  }

  loadConversation(id: string) {
    this.currentConversationId = id;
    this.conversationService.loadConversation(id).subscribe((response) => {
      if (response.success) {
        this.conversation = response.conversation.messages.map((msg: any) => ({
          ...msg,
          message: this.sanitizer.bypassSecurityTrustHtml(msg.message),
        }));
      }
    });
  }

  saveConversation() {
    if (!this.currentConversationId) return;
    const sanitizedConversation = this.conversation.map((msg) => ({
      sender: msg.sender,
      message:
        typeof msg.message === 'string' ? msg.message : msg.message.toString(),
    }));
    this.conversationService
      .saveConversation(this.currentConversationId, sanitizedConversation)
      .subscribe((response) => {
        if (response.success) {
          console.log('Conversation saved successfully');
        }
      });
  }

  getMessage() {
    if (this.prompt.trim() === '') return;

    if (!this.currentConversationId) {
      this.createNewConversationAndLoad();
    }

    this.conversation.push({ sender: 'user', message: this.prompt });

    if (this.prompt.startsWith('/image')) {
      this.getImage(this.prompt.replace('/image', '').trim());
    } else if (this.prompt.startsWith('/speech')) {
      this.getVoice(this.prompt.replace('/speech', '').trim());
    } else {
      this.getChatResponse(this.prompt);
    }
    this.prompt = '';
    this.saveConversation();
  }

  getChatResponse(prompt: string) {
    this.gptService.getChatResponse(prompt).subscribe((response) => {
      const botMessage = response.data.choices[0].message.content;
      this.conversation.push({ sender: 'bot', message: botMessage });
      this.saveConversation();
    });
  }

  getImage(prompt: string) {
    this.gptService.getImage(prompt).subscribe((response) => {
      const imageSrc = response.data.data[0].url;
      const sanitizedImage = this.sanitizer.bypassSecurityTrustHtml(
        `<img src="${imageSrc}" alt="Image from Dall-E">`,
      );
      this.conversation.push({
        sender: 'bot',
        message: sanitizedImage,
      });
      this.saveConversation();
    });
  }

  getVoice(prompt: string) {
    this.gptService.getVoice(prompt).subscribe((response) => {
      const audioUrl = URL.createObjectURL(
        new Blob([response], { type: 'audio/mpeg' }),
      );
      const sanitizedAudio = this.sanitizer.bypassSecurityTrustHtml(
        `<audio controls src="${audioUrl}"></audio>`,
      );
      this.conversation.push({
        sender: 'bot',
        message: sanitizedAudio,
      });
      this.saveConversation();
    });
  }

  formatMessage(message: { sender: string; message: string | SafeHtml }) {
    const className =
      message.sender === 'user' ? 'message user' : 'message bot';
    return {
      className: className,
      content: message.message,
    };
  }
}
