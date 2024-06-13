import { Component } from '@angular/core';
import { GptService } from '../../core/services/gpt.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  prompt: string = '';
  conversation: { sender: string; message: string | SafeHtml }[] = [];

  constructor(
    private gptService: GptService,
    private sanitizer: DomSanitizer,
  ) {}

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
    this.prompt = ''; // Clear input after sending message
  }

  getChatResponse(prompt: string) {
    this.gptService.getChatResponse(prompt).subscribe((response) => {
      const botMessage = response.data.choices[0].message.content;
      this.conversation.push({ sender: 'bot', message: botMessage });
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
