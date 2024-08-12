import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type MessageWsType = 'serve' | 'build' | 'firebase-projects-list' | 'firebase-deploy-preview' | 'firebase-deploy-prod';

export interface MessageWs {
  type: MessageWsType;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServerWebSocketService {
  private socket: WebSocket | undefined;
  private messageSubject: Subject<MessageWs> = new Subject<MessageWs>();

  connect(): void {
    if (this.socket) {
      return;
    }

    this.socket = new WebSocket('ws://localhost:3000'); // Remplacez par l'URL de votre serveur WebSocket

    this.socket.onmessage = (event) => {
      try {
        this.messageSubject.next(JSON.parse(event.data));
      } catch (e) {
        this.messageSubject.next(event.data);
      }
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket closed. Reconnecting...', event);
      setTimeout(() => this.connect(), 1000);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  public get messages() {
    return this.messageSubject.asObservable();
  }
}
