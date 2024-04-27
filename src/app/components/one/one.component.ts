import { AfterViewChecked, AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { TwoComponent } from '../two/two.component';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  template: '<p>{{ message }}</p>',
  styleUrl: './one.component.scss'
})
export class OneComponent{

  @Input() h!: string;

}
