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
  staticTime = 0;
  startStop = "Start";
  color = "green";
  milisec;
  // disablePause = true;
  pause = false;

  valueTimeSave;

  sourceSec;
  subscribeSec;

  startTimerSec(){
    // this.disablePause = false;
    if(!this.pause){
      this.pause = true;
      this.startStop = "Stop";
      this.color = "red";
      this.sourceSec = timer(0, 1000);
      this.subscribeSec = this.sourceSec.subscribe(val => {
        let sec = this.staticTime + val;
        let min = Math.floor(sec/60);
        let hour = Math.floor(min/60);
        sec %= 60;
        min %= 60;
        hour %= 60;

        this.valueTimeSave =  this.staticTime + val;

        if(sec<10){
          this.seconds = "0" + sec;
        }else{
          this.seconds = sec;
        }
        // else if(sec >= 10 && sec < 60){
        //   this.seconds = "" + sec;
        // }
        if(min < 10){
          this.minutes = "0" + min;
        }else{
          this.minutes = "" + min;
        }
        if(hour < 10){
          this.hours = "0" + hour;
        }else{
          this.hours = "" + hour;
        }
      });
    }else{
      this.stopTimerSec();
      this.startStop = "Start";
      this.color = "green"
    }

  }
  pauseTimer(){
    this.subscribeSec.unsubscribe();
    this.staticTime = this.valueTimeSave;
    this.pause = false;
    this.startStop = "Start";
    this.color = "green";
  }
  stopTimerSec(){
    this.subscribeSec.unsubscribe();
    this.staticTime = 0;
    this.valueTimeSave = 0;
    this.pause = false;
  }
  startTimerMinute(){
    let m = 1;
    if (this.minutes == "00" && m < 9){
      this.minutes= "0" + m;
    }else if(m >= 10 && m < 60){
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
    }else if(h>=10 && h<60){
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
    this.staticTime = 0;
    this.pause = false;
    this.startStop = "Start";
    this.color = "green";
  }


}
