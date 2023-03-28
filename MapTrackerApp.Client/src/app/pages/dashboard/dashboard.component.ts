import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  headElements = ['Page Name', 'Views', 'Value', 'Bounce Rate']
  elements = [
    {
      name: '/demo/admin/index.html',
      views: '3,689',
      value: '$10',
      rate: '20%'
    },
    {
      name: '/demo/admin/index.html',
      views: '3,689',
      value: '$10',
      rate: '20%'
    },
    {
      name: '/demo/admin/index.html',
      views: '3,689',
      value: '$10',
      rate: '20%'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

