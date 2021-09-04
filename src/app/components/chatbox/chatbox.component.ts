import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { Message } from '../../models/message';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss'],
})
export class ChatboxComponent implements OnInit {
  currentMessage: Message;
  messages: Message[];
  private _docSub: Subscription;

  constructor(private documentService: DocumentService) {
    this.currentMessage = new Message();
    this.messages = [];
    this._docSub = new Subscription();
  }

  ngOnInit(): void {
    this._docSub = this.documentService.lastMessage
    .subscribe((msg) => {
      this.currentMessage.id = msg.id;
      this.messages = [...this.messages, msg];
      console.log(msg);
    });
  }

  sendMessage() {
    // console.log(this.documentService.id)
    // this.currentMessage.id = this.documentService.currentDocument.;
    // console.log(this.currentMessage);
    // this.message.content = this.currentMessage.content;
    this.documentService.sendMessage(this.currentMessage);
  }

  getMessages(id: string) {
    this.documentService.getMessages(id);
  }
}
