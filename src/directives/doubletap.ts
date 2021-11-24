import { Directive, ElementRef, OnInit, OnDestroy, Output, EventEmitter, Input, Renderer2 } from '@angular/core';
import { Events, HammerCallback, HammerBuilder, HammerType } from '../public-api';
import { CoreGestureService } from './gesture';
import { CoreGestureTransitionService } from './gesture-transitions';

/**
 * Directive to add long press actions to html elements.
 */
@Directive({
  selector: '[doubletap]'
})
export class CoreDoubleTapDirective extends CoreGestureService implements OnInit, OnDestroy {

  @Input() transitionactive: boolean;
  @Output() doubletapChange: EventEmitter<any>;

  constructor(public el: ElementRef, public renderer: Renderer2, private transitionService: CoreGestureTransitionService) {
    super(el, renderer);
    this.doubletapChange = new EventEmitter();
  }

  /**
   * Initialize gesture listening.
   */
  ngOnInit(): void {
    const hammerType: HammerType = 'doubletap';
    const events: Events[] = []
    const hammer: HammerBuilder = {
      type: hammerType,
      events: events,
    }
    this.handle(hammer, (hammer: HammerCallback) => {
      if (this.transitionactive) {
        this.transitionService.doubletapTransition(hammer, this.el);
      }
      this.doubletapChange.emit(hammer);
    });
    console.log('DoubleTap Directive Works', this.transitionactive);
  }
}
