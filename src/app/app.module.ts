import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LinesVisualizerDirective } from './directives/lines-visualizer.directive';
import { CircleVisualizerDirective } from './directives/circle-visualizer.directive';
import { ChooseAudioComponent } from './components/choose-audio/choose-audio.component';
import { PlayPauseComponent } from './components/play-pause/play-pause.component';
import { RectsVisualizerDirective } from './directives/rects-visualizer.directive';

@NgModule({
  declarations: [
    AppComponent,
    LinesVisualizerDirective,
    CircleVisualizerDirective,
    ChooseAudioComponent,
    PlayPauseComponent,
    RectsVisualizerDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
