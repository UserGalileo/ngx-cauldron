import { Inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, NEVER } from 'rxjs';
import * as socketio from 'socket.io-client';
import { SOCKET_CONFIG, SocketConfig } from './config';

@Injectable()
export class SocketService {

  private socket: SocketIOClient.Socket;
  connected$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject(SOCKET_CONFIG) private config: SocketConfig) {
    this.socket = socketio(config.baseUrl, config.config);
    this.socket.on('connect', () => this.connected$.next(true));
    this.socket.on('disconnect', () => this.connected$.next(false));
  }

  join(room: string) {
    // auto rejoin after reconnect mechanism
    this.connected$.subscribe(connected => {
      if (connected) {
        this.socket.emit('join', {room});
      }
    });
  }

  disconnect() {
    this.socket.disconnect();
    this.connected$.next(false);
  }

  emit(event: string, data?: any) {

    console.group();
    console.log('----- SOCKET OUTGOING -----');
    console.log('Action: ', event);
    console.log('Payload: ', data);
    console.groupEnd();

    this.socket.emit(event, data);
  }

  listen(event: string): Observable<any> {
    return new Observable( observer => {

      this.socket.on(event, data => {

        console.group();
        console.log('----- SOCKET INBOUND -----');
        console.log('Action: ', event);
        console.log('Payload: ', data);
        console.groupEnd();

        observer.next(data);
      });
      // dispose of the event listener when unsubscribed
      return () => this.socket.off(event);
    });
  }

}

@Injectable()
export class NoopSocketService {
  join() {}
  disconnect() {}
  emit() {}
  listen(): Observable<any> { return NEVER; }
}
