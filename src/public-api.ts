/*
 * Public API Surface of clean lib
 */

import { ElementRef } from '@angular/core';
export type HammerBuilder = { type: HammerType, events?: Events[] }
export type HammerType = 'pan' | 'pinch' | 'swipe' | 'press' | 'tap' | 'doubletap';
export type Events =
  HammerPanEvents |
  HammerPinchEvents |
  HammerPressEvents |
  HammerSwipeEvents |
  HammerTapEvents |
  HammerDoubleTapEvents;
export type HammerCallback = {
  el: ElementRef
  type: HammerType;
  events: Events[];
  data?: HammerData;
}
export type HammerData = {
  type: string;
  deltaX: number;
  deltaY: number;
  deltaTime: number;
  distance: number;
  angle: number;
  velocityX: number;
  velocityY: number;
  velocity: number;
  direction: number;
  offsetDirection: number;
  scale: number;
  rotation: number;
  center: CoordinatesType;
  srcEvent: any;
  target: any;
  pointerType: string;
  eventType: number;
  isFirst: boolean;
  isFinal: boolean;
  pointers: any;
  additionalEvent: string;
  changedPointers: any;
  preventDefault: Function;
}
export type CoordinatesType = {
  x: number;
  y: number;
}
export enum HammerPanEvents {
  panleft = 'panleft',
  panright = 'panright',
  panup = 'panup',
  pandown = 'pandown',
  panstart = 'panstart',
  panmove = 'panmove',
  panend = 'panend',
  pancancel = 'pancancel'
}
export enum HammerPinchEvents {
  pinchstart = 'pinchstart',
  pinchmove = 'pinchmove',
  pinchend = 'pinchend',
  pinchcancel = 'pinchcancel',
  pinchin = 'pinchin',
  pinchout = 'pinchout'
}
export enum HammerPressEvents {
  press = 'press',
  pressup = 'pressup'
}
export enum HammerSwipeEvents {
  swipeleft = 'swipeleft',
  swiperight = 'swiperight',
  swipeup = 'swipeup',
  swipedown = 'swipedown',
}
export enum HammerTapEvents {
  tap = 'tap'
}
export enum HammerDoubleTapEvents {
  doubletap = 'doubletap'
}

export { InonicHammerGestureModule } from './directives/directives.module';

