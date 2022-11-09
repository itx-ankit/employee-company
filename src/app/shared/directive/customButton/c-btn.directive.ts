import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appcustomButton]',
})
export class customButtonDirective {
  constructor(public elementRef: TemplateRef<any>) {}
}
