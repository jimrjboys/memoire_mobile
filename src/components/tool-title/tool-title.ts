import { Component, Input } from '@angular/core';

@Component({
  selector: 'tool-title',
  templateUrl: 'tool-title.html'
})
export class ToolTitleComponent {

  @Input() title: string
  @Input() icon: any 

  constructor() {
  }

  ionViewDidLoad() {
  }

}
