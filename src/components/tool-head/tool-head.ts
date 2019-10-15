import { Component, Input } from '@angular/core';

@Component({
  selector: 'tool-head',
  templateUrl: 'tool-head.html'
})
export class ToolHeadComponent {

  text: string;

  @Input() displayToogle: boolean
  @Input() display: boolean = true

  constructor() {
    console.log('Hello ToolHeadComponent Component');
    this.text = 'Hello World';
  }

}
