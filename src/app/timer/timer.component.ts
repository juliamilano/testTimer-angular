import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  @Input('hourData') hourView: any;
  @Input('minuteData') minuteView: any;
  @Input('secondData') secondView: any;


  constructor() {

  }


}
