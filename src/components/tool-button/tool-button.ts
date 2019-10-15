import { Component, Input } from '@angular/core';

@Component({
  selector: 'tool-button',
  templateUrl: 'tool-button.html'
})
export class ToolButtonComponent {
  @Input() text: string;
}
