import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { HammerBuilder, HammerType, Events, HammerCallback, HammerPinchEvents } from '../public-api';
import { CoreGestureService } from './gesture';
import { CoreGestureTransitionService } from './gesture-transitions';

/**
 * Directive to add long press actions to html elements.
 */
@Directive({
  selector: '[pinch]'
})
export class CorePinchDirective extends CoreGestureService implements OnInit, OnDestroy {

  @Input() transitionactive: boolean;
  @Output() pinchChange: EventEmitter<any>;

  constructor(public el: ElementRef, public renderer: Renderer2, private transitionService: CoreGestureTransitionService) {
    super(el, renderer);
    this.pinchChange = new EventEmitter();
  }

  /**
   * Initialize gesture listening.
   */
  ngOnInit(): void {
    const hammerType: HammerType = 'pinch';
    const events: Events[] = [HammerPinchEvents.pinchmove]
    const hammer: HammerBuilder = {
      type: hammerType,
      events: events,
    }
    this.handle(hammer, (hammer: HammerCallback) => {
      if (this.transitionactive) {
        this.transitionService.pinchTransition(hammer, this.el);
      }
      this.pinchChange.emit(hammer);
    });
    console.log('Pinch Directive Works', this.transitionactive);
  }
}
