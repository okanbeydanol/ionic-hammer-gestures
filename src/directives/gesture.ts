import { ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Injectable } from '@angular/core';
import { Events, HammerBuilder, HammerCallback, HammerData, HammerDoubleTapEvents, HammerPanEvents, HammerPinchEvents, HammerPressEvents, HammerSwipeEvents, HammerTapEvents, HammerType } from '../public-api';
import * as Hammer from 'hammerjs';
import * as  Manager from 'hammerjs';

/**
 * Directive to add hammerjs all event.
 */
@Injectable()
export class CoreGestureService implements AfterViewInit {
  private element: HTMLElement;
  private listener: HammerCallback;
  private eventsPan: Events[] =
    [
      HammerPanEvents.panstart,
      HammerPanEvents.panmove,
      HammerPanEvents.panend
    ];

  private eventsPinch: Events[] =
    [
      HammerPinchEvents.pinchstart,
      HammerPinchEvents.pinchmove,
      HammerPinchEvents.pinchend,
    ];
  private eventsSwipe: Events[] =
    [
      HammerSwipeEvents.swipedown,
      HammerSwipeEvents.swipeleft,
      HammerSwipeEvents.swiperight,
      HammerSwipeEvents.swipeup
    ];
  private eventsPress: Events[] =
    [
      HammerPressEvents.press,
      HammerPressEvents.pressup,
    ];
  private eventsTap: Events[] =
    [
      HammerTapEvents.tap,
    ];
  private eventsDoubleTap: Events[] =
    [
      HammerDoubleTapEvents.doubletap,
    ];
  private mc: Manager;



  constructor(public el: ElementRef, public renderer: Renderer2) {
    this.element = el.nativeElement;
    this.mc = new Hammer(this.element);
    this.listener = null;
  }

  /**
 * View has been initialized
 */
  ngAfterViewInit(): void {
    this.element.setAttribute('tappable', '');
  }

  handle(hammer: HammerBuilder, callback: Function) {
    if (hammer.type) {
      const eventRules: Events[] = this.eventRules(hammer.type, hammer.events);
      this.listener = { el: this.el, type: hammer.type, events: eventRules };
      if (hammer.type == 'pan') {
        this.panHandler(eventRules, (data: HammerData) => {
          this.listener['data'] = data;
          callback(this.listener)
        });
      } else if (hammer.type == 'press') {
        this.pressHandler(eventRules, (data: HammerData) => {
          this.listener['data'] = data;
          callback(this.listener)
        });
      } else if (hammer.type == 'tap') {
        this.tapHandler(eventRules, (data: HammerData) => {
          this.listener['data'] = data;
          callback(this.listener)
        });
      } else if (hammer.type == 'doubletap') {
        this.doubleTapHandler(eventRules, (data: HammerData) => {
          this.listener['data'] = data;
          callback(this.listener)
        });
      } else if (hammer.type == 'swipe') {
        this.swipeHandler(eventRules, (data: HammerData) => {
          this.listener['data'] = data;
          callback(this.listener)
        });
      } else if (hammer.type == 'pinch') {
        this.pinchHandler(eventRules, (data: HammerData) => {

          this.listener['data'] = data;
          callback(this.listener)
        });
      }
      return this.mc;
    } else {
      callback('You need to define the type: HammerType = "pan"');
    }
  }

  private panHandler(events: Events[], callback: Function) {
    const event = events ? events.join(' ').toString() : this.eventsPan.join(' ').toString();
    this.mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    this.mc.on(event, (data: HammerData) => {
      callback(data);
    });
  }

  private pressHandler(events: Events[], callback: Function) {
    const event = events ? events.join(' ').toString() : this.eventsPress.join(' ').toString();
    this.mc.get('press').set();
    this.mc.on(event, (data) => {
      callback(data);
    });
  }

  private tapHandler(events: Events[], callback: Function) {
    const event = events ? events.join(' ').toString() : this.eventsTap.join(' ').toString();
    this.mc.add(new Hammer.Tap({ event: 'singletap' }));
    this.mc.on(event, (data) => {
      callback(data);
    });
  }

  private doubleTapHandler(events: Events[], callback: Function) {
    const event = events ? events.join(' ').toString() : this.eventsDoubleTap.join(' ').toString();
    this.mc.on(event, (data) => {
      callback(data);
    });
  }

  private swipeHandler(events: Events[], callback: Function) {
    const event = events ? events.join(' ').toString() : this.eventsSwipe.join(' ').toString();
    this.mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    this.mc.on(event, (data) => {
      callback(data);
    });
  }

  private pinchHandler(events: Events[], callback: Function) {
    const event = events ? events.join(' ').toString() : this.eventsPinch.join(' ').toString();
    this.mc.add([new Hammer.Pinch()]);
    this.mc.on(event, (data) => {
      callback(data);
    });
  }

  private eventRules(type: HammerType, events: Events[]): Events[] {
    const ar = [];
    if (type == 'pan') {
      if (!events || events.length === 0) {
        return this.eventsPan;
      } else {
        events.forEach((event) => {
          const findIndex = this.eventsPan.findIndex(o => o == event);
          if (findIndex != -1) {
            ar.push(event);
          }
        });
        const lookNecessaryPanEndIndex = ar.findIndex(o => o === 'panend');
        const lookNecessaryPanStartIndex = ar.findIndex(o => o === 'panstart');
        if (lookNecessaryPanEndIndex === -1) {
          ar.push(HammerPanEvents.panend);
        }
        if (lookNecessaryPanStartIndex === -1) {
          ar.push(HammerPanEvents.panstart);
        }
      }

    } else if (type == 'pinch') {
      if (!events || events.length === 0) {
        return this.eventsPinch;
      } else {
        events.forEach((event) => {
          const findIndex = this.eventsPinch.findIndex(o => o == event);
          if (findIndex != -1) {
            ar.push(event);
          }
        });
        const lookNecessaryPinchendIndex = ar.findIndex(o => o === 'pinchend');
        const lookNecessaryPinchstartIndex = ar.findIndex(o => o === 'pinchstart');
        if (lookNecessaryPinchendIndex === -1) {
          ar.push(HammerPinchEvents.pinchend);
        }
        if (lookNecessaryPinchstartIndex === -1) {
          ar.push(HammerPinchEvents.pinchstart);
        }
      }
    } else if (type == 'swipe') {
      if (!events || events.length === 0) {
        return this.eventsSwipe;
      } else {
        events.forEach((event) => {
          const findIndex = this.eventsSwipe.findIndex(o => o == event);
          if (findIndex != -1) {
            ar.push(event);
          }
        });
      }
    } else if (type == 'press') {
      if (!events || events.length === 0) {
        return this.eventsPress;
      } else {
        events.forEach((event) => {
          const findIndex = this.eventsPress.findIndex(o => o == event);
          if (findIndex != -1) {
            ar.push(event);
          }
        });
      }
    } else if (type == 'tap') {
      if (!events || events.length === 0) {
        return this.eventsTap;
      } else {
        events.forEach((event) => {
          const findIndex = this.eventsTap.findIndex(o => o == event);
          if (findIndex != -1) {
            ar.push(event);
          }
        });
      }
    } else if (type == 'doubletap') {
      if (!events || events.length === 0) {
        return this.eventsDoubleTap;
      } else {
        events.forEach((event) => {
          const findIndex = this.eventsDoubleTap.findIndex(o => o == event);
          if (findIndex != -1) {
            ar.push(event);
          }
        });
      }
    }
    return ar;
  }

  /**
 * Destroy gesture listening.
 */
  ngOnDestroy(): void {
    this.mc.destroy();
  }
}
