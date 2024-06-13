import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  history: string[] = [];

  newChat() {
    // Logic for creating a new chat
  }

  setPrompt(prompt: string) {
    // Logic for setting the prompt in the main component
  }
}
