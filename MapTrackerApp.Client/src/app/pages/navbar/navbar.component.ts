import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  @Input() bg: any;
  @Input() color: any;
  btnStyle: any
  constructor() { }

  ngOnInit(): void {
    this.btnStyle = `color: ${this.color}`
  }

}
