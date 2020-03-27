import {Directive, ElementRef} from '@angular/core';
import {VisualizerDirective} from './visualizer.directive';
import {SoundService} from '../services/sound.service';

@Directive({
  selector: '[appRectsVisualizer]'
})
export class RectsVisualizerDirective extends VisualizerDirective {

  constructor(el: ElementRef, audio: SoundService) {
    super(el, audio);
  }

  render([dataL, dataR]: Uint8Array[]) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'blue';
    const rows = 25;
    const columns = Math.ceil(dataL.length / rows / 4);
    const space = 10;
    const w = (this.canvas.width - space * (columns + 1)) / columns;
    const h = (this.canvas.height - space * (rows + 1)) / rows;
    for (let row = 0; row < rows; row++) {
      for (let col  = 0; col < columns; col++) {
        const i = row * columns + col;
        const y = this.avg(dataL.slice(i * 4, i * 4 + 4));
        this.ctx.fillStyle = `hsla(${y * 360 / 255}, 90%, 70%, ${y})`;
        this.ctx.fillRect(space * (col + 1) + w * col, space * (row + 1) + h * row, w, h);
      }
    }
  }

}
