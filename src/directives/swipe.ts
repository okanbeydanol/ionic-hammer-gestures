import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { HammerBuilder, HammerType, Events, HammerCallback } from '../public-api';
import { CoreGestureService } from './gesture';

/**
 * Directive to add swipe actions to html elements.
 */
@Directive({
  selector: '[swipe]'
})
export class CoreSwipeDirective extends CoreGestureService implements OnInit, OnDestroy {

  @Input() transitionactive: boolean;
  @Output() swipeChange: EventEmitter<any>;

  constructor(public el: ElementRef, public renderer: Renderer2) {
    super(el, renderer);
    this.swipeChange = new EventEmitter();
  }

  /**
   * Initialize gesture listening.
   */
  ngOnInit(): void {
    const hammerType: HammerType = 'swipe';
    const events: Events[] = []
    const hammer: HammerBuilder = {
      type: hammerType,
      events: events,
    }
    this.handle(hammer, (hammer: HammerCallback) => {
      if (this.transitionactive) {
        //do stuff
      }
      this.swipeChange.emit(hammer);
    });
    console.log('Swipe Directive Works', this.transitionactive);
  }
}
