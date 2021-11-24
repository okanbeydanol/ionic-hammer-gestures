import { Directive, ElementRef, OnInit, Renderer2, Input, EventEmitter, Output } from '@angular/core';
import { HammerBuilder, HammerType, Events, HammerCallback } from '../public-api';
import { CoreGestureService } from './gesture';

/**
 * Directive to add long press actions to html elements.
 */
@Directive({
  selector: '[tap]'
})
export class CoreTapDirective extends CoreGestureService implements OnInit {

  @Input() transitionactive: boolean;
  @Output() tapChange: EventEmitter<any>;

  constructor(public el: ElementRef, public renderer: Renderer2) {
    super(el, renderer);
    this.tapChange = new EventEmitter();
  }

  /**
   * Initialize gesture listening.
   */
  ngOnInit(): void {
    const hammerType: HammerType = 'tap';
    const events: Events[] = []
    const hammer: HammerBuilder = {
      type: hammerType,
      events: events,
    }
    this.handle(hammer, (hammer: HammerCallback) => {
      if (this.transitionactive) {
        //do stuff
      }
      this.tapChange.emit();
    });
    console.log('Tap Directive Works', this.transitionactive);
  }
}
