import {AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy} from '@angular/core';
import {SoundService} from '../services/sound.service';
import {Subscription} from 'rxjs';
import {VisualizerDirective} from './visualizer.directive';
import {getSuperClassDeclarations} from '@angular/core/schematics/migrations/static-queries/angular/super_class';

@Directive({
  selector: '[appLinesVisualizer]'
})
export class LinesVisualizerDirective extends VisualizerDirective {

  @Input('appLinesVisualizer') epoch: number;
  @Input() maxHeight = .8;
  grd1: CanvasGradient;
  grd2: CanvasGradient;

  constructor(el: ElementRef, audio: SoundService) {
    super(el, audio);
  }

  initCanvas() {
    super.initCanvas();
    this.grd1 = this.ctx.createLinearGradient(0,  this.canvas.height / 2, 0, this.canvas.height);
    this.grd1.addColorStop(0, '#ff1a1a');
    this.grd1.addColorStop(1, '#f9ff75');
    this.grd2 = this.ctx.createLinearGradient(0,  this.canvas.height / 2, 0, 0);
    this.grd2.addColorStop(0, '#ff1a1a');
    this.grd2.addColorStop(1, '#f9ff75');
  }
  render([dataL, dataR]: Uint8Array[]) {
    if (!this.canvas || !this.ctx) {return; }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const epoch = +this.epoch || 20;
    const size = dataL.length / epoch;
    const interval = this.canvas.width / epoch;
    this.ctx.fillStyle = this.grd1;
    for (let i = 0; i < dataL.length; i += size) {
      const y = this.avg(dataL.slice(i, i + size)) * this.canvas.height * .8 / 255;
      this.ctx.fillRect(i * interval / size, this.canvas.height - y, interval, y);
    }
    this.ctx.fillStyle = this.grd2;
    for (let i = 0; i < dataR.length; i += size) {
      const y = dataR.slice(i, i + size).reduce((a, b) => a + b / size, 0) * this.canvas.height * .8 / 255;
      this.ctx.fillRect(this.canvas.width - i * interval / size - interval, 0, interval, y);
    }
  }

}
