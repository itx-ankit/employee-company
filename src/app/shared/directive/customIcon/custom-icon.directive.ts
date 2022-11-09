import {
  Directive,
  ElementRef,
  ViewContainerRef,
  SimpleChanges,
  Input,
} from '@angular/core';
import { IIcon } from '../../Interfaces/IIcon';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: '[appCustomIcon]',
})
export class CustomIconDirective {
  @Input() data: IIcon;

  constructor(
    private elmRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.configIcon();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.configIcon();
  }

  configIcon() {
    if (this.data && this.data.type) {
      if (this.data.type === 'MATICON') {
        this.elmRef.nativeElement.innerHTML = '';
        const icon = this.viewContainerRef.createComponent(MatIcon);
        this.elmRef.nativeElement.appendChild(icon.location.nativeElement);
        this.elmRef.nativeElement.children[0].innerHTML = this.data.class;
      } else if (this.data.type === 'FONTAWESOME') {
        this.elmRef.nativeElement.innerHTML = `<i class='${this.data.class}${
          this.data.extraClass ?? ''
        }'></i>`;
      }
    }
  }
}
