import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { HammerBuilder, HammerType, Events, HammerCallback, HammerPressEvents } from '../public-api';
import { CoreGestureService } from './gesture';


/**
 * Directive to add long press actions to html elements.
 */
@Directive({
  selector: '[press]'
})
export class CorePressDirective extends CoreGestureService implements OnInit, OnDestroy {

  @Input() transitionactive: boolean;
  @Output() pressChange: EventEmitter<any>;

  constructor(public el: ElementRef, public renderer: Renderer2) {
    super(el, renderer);
    this.pressChange = new EventEmitter();
  }

  /**
   * Initialize gesture listening.
   */
  ngOnInit(): void {
    const hammerType: HammerType = 'press';
    const events: Events[] = [HammerPressEvents.press]
    const hammer: HammerBuilder = {
      type: hammerType,
      events: events,
    }
    this.handle(hammer, (hammer: HammerCallback) => {
      if (this.transitionactive) {
        //do stuff
      }
      this.pressChange.emit(hammer);
    });
    console.log('Press Directive Works', this.transitionactive);
  }
}
