import {AfterViewInit, Directive, ElementRef, HostListener, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {SoundService} from '../services/sound.service';

@Directive({
  selector: '[appVisualizer]'
})
export abstract class VisualizerDirective implements AfterViewInit, OnDestroy {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  subscription: Subscription;
  @HostListener('window:resize') onresize() {
    this.initCanvas();
  }
  protected constructor(private el: ElementRef, private audio: SoundService) {
    this.subscription = audio.data.subscribe((data) => this.render(data));
  }
  ngAfterViewInit(): void {
    this.canvas = this.el.nativeElement as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.initCanvas();
  }
  initCanvas() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }
  abstract render(data: Uint8Array[]);
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  avg(data: Uint8Array): number {
    return data.reduce((a, b) => a + b / data.length, 0);
  }

}
