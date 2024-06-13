import { Component, OnInit } from '@angular/core';
import { GptService } from '../../core/services/gpt.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConversationService } from '../../core/services/conversation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  prompt: string = '';
  conversation: { sender: string; message: string | SafeHtml }[] = [];
  userId: string = 'some-user-id'; // This should be dynamically set based on the authenticated user

  constructor(
    private conversationService: ConversationService,
    private gptService: GptService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.loadConversation();
  }

  loadConversation() {
    this.conversationService.loadConversation().subscribe((response) => {
      if (response.success) {
        this.conversation = response.conversation.messages.map((msg: any) => ({
          ...msg,
          message: this.sanitizer.bypassSecurityTrustHtml(msg.message),
        }));
      }
    });
  }

  saveConversation() {
    this.conversationService
      .saveConversation(this.conversation)
      .subscribe((response) => {
        if (response.success) {
          console.log('Conversation saved successfully');
        }
      });
  }

  getMessage() {
    if (this.prompt.trim() === '') return;
    // Add user message to conversation
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
