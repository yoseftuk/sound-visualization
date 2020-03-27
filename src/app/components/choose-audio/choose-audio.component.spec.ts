import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAudioComponent } from './choose-audio.component';

describe('ChooseAudioComponent', () => {
  let component: ChooseAudioComponent;
  let fixture: ComponentFixture<ChooseAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
