import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Observable<String[]>;
  currentDoc: String | undefined;
  private _docSub: Subscription;

  constructor(private documentService: DocumentService) {
    this.documents = new Observable<String[]>();
    this.currentDoc = '';
    this._docSub = new Subscription();
  }

  ngOnInit(): void {
    this.documents = this.documentService.documents;
    this._docSub = this.documentService.currentDocument.subscribe(
      (doc) => (this.currentDoc = doc.id)
    );
  }

  ngOnDestroy(): void {
    this._docSub.unsubscribe();
  }

  loadDoc(id: String) {
    this.documentService.getDocument(id);
  }

  newDoc() {
    this.documentService.newDocument();
  }
}
