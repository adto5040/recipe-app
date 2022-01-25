import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Output() navClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(target: string) {
    this.navClicked.emit(target);
  }
}
