import {Directive, ElementRef, Input} from '@angular/core';
import {VisualizerDirective} from './visualizer.directive';
import {SoundService} from '../services/sound.service';

@Directive({
  selector: '[appCircleVisualizer]'
})
export class CircleVisualizerDirective extends VisualizerDirective {

  @Input('appCircleVisualizer') epoch: number;
  grd: CanvasGradient;
  constructor(el: ElementRef, audio: SoundService) {
    super(el, audio);
  }
  initCanvas() {
    super.initCanvas();
    this.grd = this.ctx.createRadialGradient(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.canvas.height / 16,
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.canvas.height / 1.5);
    this.grd.addColorStop(0, '#f9ff75');
    this.grd.addColorStop(1, '#ff1a1a');
  }

  private getXY(baseR, v: number, deg: number): number[] {
    const max = this.canvas.height * 2 / 8;
    return [
      this.canvas.width / 2 + Math.cos(deg) * (baseR + v * max / 255),
      this.canvas.height / 2 + Math.sin(deg) * (baseR + v * max / 255)
    ];
  }
  draw(data: Uint8Array, baseR: number, fill: string | CanvasGradient) {
    const epoch = +this.epoch || 30;
    const size = data.length / epoch;
    this.ctx.beginPath();
    this.ctx.fillStyle = fill;
    const [sX, sY] = this.getXY(baseR, data[0], - Math.PI / 2);
    this.ctx.moveTo(sX, sY);
    for (let i = 0; i < epoch; i ++) {
      const deg = i * Math.PI / (epoch - 1) - Math.PI / 2;
      const [x, y] = this.getXY(baseR, this.avg(data.slice(i * size, (i + 1) * size)), deg);
      this.ctx.lineTo(x, y);
    }
    for (let i = epoch - 1; i >= 0; i --) {
      const deg = Math.PI + (epoch - 1 - i) * Math.PI / (epoch - 1) - Math.PI / 2;
      const [x, y] = this.getXY(baseR, this.avg(data.slice(i * size, (i + 1) * size)), deg);
      this.ctx.lineTo(x, y);
    }
    this.ctx.lineTo(sX, sY);
    this.ctx.fill();
    this.ctx.closePath();
  }
  render([dataL, dataR]: Uint8Array[]) {
    const baseR = this.canvas.height / 4;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw(dataL, baseR, this.grd);
    this.draw(dataR, baseR / 2, 'black');
  }

}
