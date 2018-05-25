import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket;
  private status: BehaviorSubject<string> = new BehaviorSubject<string>("waiting");

  constructor() {
    this.socket = io.connect('http://localhost:7000');

    this.socket.io.on("connect_error", () => this.status.next("disconnected"));
    this.socket.on('connect_failed', () => this.status.next("disconnected"));
    this.socket.on('disconnect', () => this.status.next("disconnected"));

    this.socket.on('connect', () => this.status.next("waiting"));
    this.socket.on('init:complete', () => {
      setTimeout(() => this.status.next("connected"), 500);});
  }

  public onStatus(): Observable<any> {
    return this.status;
  }

  public send(message: any): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('message', (data: any) => observer.next(data));
    });
  }

  public onEvent(event: any): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
