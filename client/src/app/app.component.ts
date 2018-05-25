import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'app';
  opened: boolean = false;
  apiStatus = "waiting";

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, socketService: SocketService) {
    iconRegistry.addSvgIcon('beluga', sanitizer.bypassSecurityTrustResourceUrl('assets/beluga.svg'));

    socketService.onStatus().subscribe((message: any) => {
      this.apiStatus = message;
    });
  }


  ngOnInit() {
  }
}
