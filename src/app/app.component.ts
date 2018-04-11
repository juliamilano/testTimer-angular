import { Component, OnDestroy } from '@angular/core';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {}
  title = 'Timer';
  hours = '00';
  minutes = '00';
  seconds = '00';

  disablePause = true;
  pause = false;

  sourceSec;
  subscribeSec;


  startTimerSec(){
    this.disablePause = false;
    this.sourceSec = timer(0, 1000);
    this.subscribeSec = this.sourceSec.subscribe(val => {
      // if(this.pause){
      //   val = this.seconds;
      //   this.pause = false;
      // }
      if(val<10){
        this.seconds= "0" +val;
      }else if(val>=10 && val<60){
        this.seconds = val;
      }else{
        this.subscribeSec.unsubscribe();
        this.startTimerSec();
        this.startTimerMinute();
    }});
  }
  // pauseTimer(){
  //   this.subscribeSec.unsubscribe();
  //   this.pause = true;
  // }
  stopTimerSec(){
    this.subscribeSec.unsubscribe();
  }
  startTimerMinute(){
    let m = 1;
    if (this.minutes == "00" && m < 9){
      this.minutes= "0" + m;
    }else if(m>10 && m<60){
      this.minutes = "" + m;
    }else{
      this.startTimerHours()
      this.minutes = '00';
      m = 1;
    }
  }

  startTimerHours(){
    let h = 1;
    if (this.hours == "00" && h < 9){
      this.hours= "0" + h;
    }else if(h>10 && h<60){
      this.hours = "" + h;
    }else{
      this.hours = '00';
      h = 1;
    }
  }
  resetAll(){
    this.subscribeSec.unsubscribe();
    this.hours = '00';
    this.minutes = '00';
    this.seconds = '00';
  }


}
