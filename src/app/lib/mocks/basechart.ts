import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[baseChart]',
})
export class MockBaseChartDirective {
  @Input() data: any;
  @Input() type: any;
  @Input() options: any;
}
