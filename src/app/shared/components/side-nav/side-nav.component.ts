import { IIcon } from './../../Interfaces/IIcon';
import { Component, OnInit } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  events: string[] = [];
  opened: boolean = true;
  menuIcon: IIcon = {
    type: 'MATICON',
    class: 'menu',
  };
  configRoute = { exact: true };
  constructor(public router: Router) {}

  ngOnInit(): void {}
}
