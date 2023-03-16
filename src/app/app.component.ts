import { Component } from '@angular/core';
import { ChatShowcaseService } from './services/chat.service';
import { BehaviorIdbService } from './utils/behaviorIdb.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatbot';
  currentIcon = 'message-square-outline';
  isShowChat: boolean = false;
  messages: any;
  messageSaved: any;

  constructor(
    protected chatShowcaseService: ChatShowcaseService,
    private behaviorIdbService: BehaviorIdbService,
    ) { }

  async ngOnInit(): Promise<void> {
    const localMessages = await this.behaviorIdbService.getMessages();
    this.messages = Object.values(localMessages);
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

    const message = {
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      user: {
        name: 'Customer',
        avatar: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/robot-face.png',
      },
    };
    this.messageSaved = await this.behaviorIdbService.addMessage(message);
    this.messages.push(this.messageSaved);

    const botReply = await this.chatShowcaseService.reply(event.message);

    if (botReply) {
      setTimeout(async () => {
        this.messageSaved =  await this.behaviorIdbService.addMessage(botReply);
        this.messages.push(this.messageSaved);
      }, 500);
    }
  }
}
