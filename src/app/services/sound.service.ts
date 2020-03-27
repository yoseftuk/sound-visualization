import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  trackSubject: Subject<string>;
  currentTrack: string;
  isPlaying: boolean;
  isListening: boolean;
  data: Subject<Uint8Array[]>;
  context: AudioContext;
  analyzerL: AnalyserNode;
  analyzerR: AnalyserNode;
  splitter: ChannelSplitterNode;
  dataL: Uint8Array;
  dataR: Uint8Array;
  source: MediaElementAudioSourceNode;
  audio: HTMLAudioElement;
  sourceConnection: AudioNode;
  splitterConnection: AudioNode;
  constructor() {
    // window.document.body.focus();
    this.currentTrack = 'bensound-buddy.mp3';
    this.trackSubject = new Subject<string>();
    this.data = new Subject<Uint8Array[]>();
    this.initAudio();
    this.context = new AudioContext();
    this.analyzerL = this.context.createAnalyser();
    this.analyzerR = this.context.createAnalyser();
    this.splitter = this.context.createChannelSplitter();
    this.analyzerL.fftSize = 8192;
    this.analyzerR.fftSize = 8192;
    this.splitter.connect(this.analyzerL, 0, 0);
    this.splitter.connect(this.analyzerR, 1, 0);
    this.dataL = new Uint8Array(this.analyzerL.frequencyBinCount);
    this.dataR = new Uint8Array(this.analyzerR.frequencyBinCount);
    document.body.addEventListener('touchend', () => this.context.resume());
    document.body.addEventListener('click', () => this.context.resume());
  }
  private initAudio() {
    this.audio = new Audio();
    this.audio.crossOrigin = 'anonymous';
    this.audio.autoplay = false;
    this.audio.loop = true;
    this.audio.muted = true;
    this.audio.addEventListener('canplay', () => this.initSplitter());
  }
  private initSplitter() {
    if(this.isPlaying) {this.audio.play()}
    if (this.source) {return; }
    this.source = this.context.createMediaElementSource(this.audio);
    this.sourceConnection = this.source.connect(this.splitter);
    this.splitterConnection = this.splitter.connect(this.context.destination);
  }

  load(src: string) {
    this.audio.src = src;
    this.audio.load();
    // this.isPlaying = true;
    if (this.isListening) {return; }
    this.isListening = true;
    this.frame();
  }
  unload() {
    this.isListening = false;
  }
  togglePlay() {
    this.isPlaying ? this.audio.pause() : this.audio.play();
    if (!this.isPlaying) {
      // this.initSplitter();
      this.audio.muted = false;
    }
    this.isPlaying = !this.isPlaying;
    return this.isPlaying;
  }
  frame() {
    if (!this.isListening) { return; }
    this.analyzerL.getByteFrequencyData(this.dataL);
    this.analyzerR.getByteFrequencyData(this.dataR);
    this.data.next([this.dataL.slice(0, 3400), this.dataR.slice(0, 3400)]);
    requestAnimationFrame(this.frame.bind(this));
  }

}
