import {Component, OnDestroy, OnInit} from '@angular/core';
import {SoundService} from './services/sound.service';
import {Subscription} from 'rxjs';

enum Types {
  LINES,
  CIRCLE,
  RECT
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  isPlaying = false;
  audios: {name: string, src: string}[] = [
    {name: 'Buddy', src: 'bensound-buddy.mp3'},
    {name: 'Energy', src: 'bensound-energy.mp3'},
    {name: 'Better Days', src: 'bensound-betterdays.mp3'},
    {name: 'Jazzy Frenchy', src: 'bensound-jazzyfrenchy.mp3'},
    {name: 'Little Idea', src: 'bensound-littleidea.mp3'},
    {name: 'Smile', src: 'bensound-smile.mp3'},
    {name: 'Summer', src: 'bensound-summer.mp3'}
  ];
  visuTypes: {name: string, id: number}[] = [
    {name: 'Lines', id: Types.LINES},
    {name: 'Circular', id: Types.CIRCLE},
    {name: 'Disco', id: Types.RECT},
  ];
  activeSound: {name: string, src: string};
  subscription: Subscription;
  types = Types;
  activeType = Types.LINES;
  constructor(private sound: SoundService) {
    this.setSound(this.audios[0]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  setSound(track: {name: string, src: string}) {
    this.activeSound = track;
    this.sound.load(`./assets/raw/${this.activeSound.src}`);
  }
  togglePlay() {
    this.isPlaying = this.sound.togglePlay();
  }

}
