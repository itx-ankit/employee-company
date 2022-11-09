import { Component, OnInit, ContentChildren } from '@angular/core';
import { customButtonDirective } from '../../directive/customButton/c-btn.directive';

@Component({
  selector: 'app-button-container',
  templateUrl: './button-container.component.html',
  styleUrls: ['./button-container.component.scss'],
})
export class ButtonContainerComponent implements OnInit {
  @ContentChildren(customButtonDirective) buttons!: customButtonDirective[];

  constructor() {}

  ngOnInit(): void {}
}
