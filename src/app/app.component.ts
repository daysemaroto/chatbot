import { Component } from '@angular/core';
import { ChatShowcaseService } from './services/chat.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatbot';
  currentIcon = 'message-square-outline';
  messages: any[] = [];
  isShowChat: boolean = false;

  constructor(
    protected chatShowcaseService: ChatShowcaseService,
    private cookieService: CookieService,
    ) {
    this.messages = this.getConversationFromCookies();
  }

  ngOnInit(): void {
  }

  changeIcon() {
    this.currentIcon = (this.currentIcon === 'message-square-outline') ? 'edit-outline' : 'message-square-outline';
  }

  showChat() {
    this.isShowChat = !this.isShowChat;
  }

  async sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file: any) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      user: {
        name: 'Customer',
        avatar: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/robot-face.png',
      },
    });
    this.saveConversationToCookies(this.messages);
    const botReply = await this.chatShowcaseService.reply(event.message);

    if (botReply) {
      setTimeout(() => {
        this.messages.push(botReply),
        this.saveConversationToCookies(this.messages);
      }, 500);
    }
  }

  saveConversationToCookies(messages: any[]): void {
    this.cookieService.set('messages', JSON.stringify(messages));
  }

  getConversationFromCookies(): any[] {
    const conversationString = this.cookieService.get('messages');
    if (conversationString) {
      return JSON.parse(conversationString);
    } else {
      return [];
    }
  }
}
