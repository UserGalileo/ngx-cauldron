import { Inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, NEVER } from 'rxjs';
import * as socketio from 'socket.io-client';
import { SOCKET_CONFIG, SocketConfig } from './config';

export abstract class SocketService {
  abstract connected$: BehaviorSubject<boolean>;
  // Join a room
  abstract join(string): void;
  // Leave a room
  abstract leave(string): void;
  // Disconnect from the server
  abstract disconnect(): void;
  // Emit an event with some data
  abstract emit(string, any?): void;
  // Listen to an event
  abstract listen(string): Observable<any>;
}

@Injectable()
export class DefaultSocketService implements SocketService {

  private socket: SocketIOClient.Socket;
  connected$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject(SOCKET_CONFIG) private config: SocketConfig) {
    this.socket = socketio(config.baseUrl, config.config);
    this.socket.on('connect', () => { console.log('connected'); this.connected$.next(true); });
    this.socket.on('disconnect', () => this.connected$.next(false));
  }

  join(room: string) {
    this.connected$.subscribe(connected => {
      if (connected) {
        this.socket.emit('joined', room);
        console.log('joined ', room);
      }
    });
  }

  leave(room: string) {
    this.connected$.subscribe(connected => {
      if (connected) {
        this.socket.emit('leave', room);
      }
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  listen(event: string): Observable<any> {
    return new Observable( observer => {

      this.socket.on(event, data => {
        observer.next(data);
      });
      // dispose of the event listener when unsubscribed
      return () => this.socket.off(event);
    });
  }
}

@Injectable()
export class NoopSocketService implements SocketService {
  connected$ = new BehaviorSubject(false);
  join() {}
  leave() {}
  disconnect() {}
  emit() {}
  listen(): Observable<any> { return NEVER; }
}
