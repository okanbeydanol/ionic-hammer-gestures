import { Directive, ElementRef, OnInit, OnDestroy, Output, EventEmitter, Input, Renderer2 } from '@angular/core';
import { Events, HammerBuilder, HammerType, HammerCallback, HammerPanEvents } from '../public-api';
import { CoreGestureService } from './gesture';
import { CoreGestureTransitionService } from './gesture-transitions';

/**
 * Directive to add long press actions to html elements.
 */
@Directive({
  selector: '[pan]'
})
export class CorePanDirective extends CoreGestureService implements OnInit, OnDestroy {

  @Input() transitionactive: boolean;
  @Output() panChange: EventEmitter<any>;

  constructor(public el: ElementRef, public renderer: Renderer2, private transitionService: CoreGestureTransitionService) {
    super(el, renderer);
    this.panChange = new EventEmitter();
  }

  /**
   * Initialize gesture listening.
   */
  ngOnInit(): void {
    const hammerType: HammerType = 'pan';
    const events: Events[] = [HammerPanEvents.panmove]
    const hammer: HammerBuilder = {
      type: hammerType,
      events: events,
    }
    this.handle(hammer, (hammer: HammerCallback) => {
      if (this.transitionactive) {
        this.transitionService.panTransition(hammer, this.el);
      }
      this.panChange.emit(hammer);
    });
    console.log('Pan Directive Works', this.transitionactive);
  }
}
