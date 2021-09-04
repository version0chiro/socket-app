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
  currentMessage: string;
  message: Message;
  private _docSub: Subscription;

  constructor(private documentService: DocumentService) {
    this.currentMessage = '';
    this.message = new Message();
    this._docSub = new Subscription();
  }

  ngOnInit(): void {}

  sendMessage() {
    this.message.content = this.currentMessage;
    this.documentService.sendMessage(this.message);
  }

  getMessages(id: string) {
    this.documentService.getMessages(id);
  }
}
