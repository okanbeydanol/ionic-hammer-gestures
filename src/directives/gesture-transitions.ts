import { ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { HammerCallback } from '../public-api';

/**
 * Directive to add hammerjs all event.
 */
@Injectable()
export class CoreGestureTransitionService {
  private fixHammerjsDeltaIssue = undefined;
  private pinchStart = { x: undefined, y: undefined }
  private trasitionsStarted = false;
  private lastEvent = undefined;
  private originalSize = {
    width: 0,
    height: 0,
  }
  private current = {
    x: 0,
    y: 0,
    z: 1,
    zooming: false,
    scale: 0,
    width: this.originalSize.width * 1,
    height: this.originalSize.height * 1,
  }

  private last = {
    x: this.current.x,
    y: this.current.y,
    z: this.current.z
  }
  private pinchZoomOrigin = undefined;
  private scaleFactor = 0.6;

  constructor() { }

  panTransition(hammer: HammerCallback, element: ElementRef) {
    this.checkSize(element);
    if (hammer.data.type !== 'panend') {
      if (this.lastEvent !== 'pan') {
        this.fixHammerjsDeltaIssue = {
          x: hammer.data.deltaX,
          y: hammer.data.deltaY
        }
      }
      this.current.x = this.last.x + hammer.data.deltaX - this.fixHammerjsDeltaIssue.x;
      this.current.y = this.last.y + hammer.data.deltaY - this.fixHammerjsDeltaIssue.y;
      this.lastEvent = 'pan';
      this.update(element);
    } else {
      this.last.x = this.current.x;
      this.last.y = this.current.y;
      this.lastEvent = 'panend';
    }
  }

  pinchTransition(hammer: HammerCallback, element: ElementRef) {
    this.checkSize(element);
    if (hammer.data.type === 'pinchstart') {
      this.pinchStart.x = hammer.data.center.x;
      this.pinchStart.y = hammer.data.center.y;
      this.pinchZoomOrigin = this.getRelativePosition(element.nativeElement, { x: this.pinchStart.x, y: this.pinchStart.y }, this.originalSize, this.current.z);
      this.lastEvent = 'pinchstart';
    } else if (hammer.data.type === 'pinchend') {
      this.last.x = this.current.x;
      this.last.y = this.current.y;
      this.last.z = this.current.z;
      this.lastEvent = 'pinchend';
    } else {
      var d = this.scaleFrom(this.pinchZoomOrigin, this.last.z, this.last.z * hammer.data.scale)
      this.current.x = d.x + this.last.x + hammer.data.deltaX;
      this.current.y = d.y + this.last.y + hammer.data.deltaY;
      this.current.z = d.z + this.last.z;
      this.lastEvent = 'pinch';
      this.update(element);
    }
  }

  doubletapTransition(hammer: HammerCallback, element: ElementRef) {
    this.checkSize(element);
    if (this.current.zooming === false) {
      this.current.zooming = true;
    } else {
      this.scaleFactor = -this.scaleFactor;
      this.current.zooming = false;
    }
    var zoomOrigin = this.getRelativePosition(element.nativeElement, { x: hammer.data.center.x, y: hammer.data.center.y }, this.originalSize, this.current.z);
    var d = this.scaleFrom(zoomOrigin, this.current.z, this.current.z + this.scaleFactor)
    this.current.x += d.x;
    this.current.y += d.y;
    this.current.z += d.z;
    this.last.x = this.current.x;
    this.last.y = this.current.y;
    this.last.z = this.current.z;
    this.scaleFactor = 0.6;
    this.update(element);
  }
  private update(element: ElementRef) {
    this.current.height = this.originalSize.height * this.current.z;
    this.current.width = this.originalSize.width * this.current.z;
    element.nativeElement.style.transform = "translate3d(" + this.current.x + "px, " + this.current.y + "px, 0) scale(" + this.current.z + ")";
  }
  private getRelativePosition(element, point, originalSize, scale) {
    var domCoords = this.getCoords(element);
    var elementX = point.x - domCoords.x;
    var elementY = point.y - domCoords.y;
    var relativeX = elementX / (originalSize.width * scale / 2) - 1;
    var relativeY = elementY / (originalSize.height * scale / 2) - 1;
    return { x: relativeX, y: relativeY }
  }
  private getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { x: Math.round(left), y: Math.round(top) };
  }
  private scaleFrom(zoomOrigin, currentScale, newScale) {
    var currentShift = this.getCoordinateShiftDueToScale(this.originalSize, currentScale);
    var newShift = this.getCoordinateShiftDueToScale(this.originalSize, newScale)
    var zoomDistance = newScale - currentScale
    var shift = {
      x: currentShift.x - newShift.x,
      y: currentShift.y - newShift.y,
    }
    var output = {
      x: zoomOrigin.x * shift.x,
      y: zoomOrigin.y * shift.y,
      z: zoomDistance
    }
    return output
  }
  private getCoordinateShiftDueToScale(size, scale) {
    var newWidth = scale * size.width;
    var newHeight = scale * size.height;
    var dx = (newWidth - size.width) / 2
    var dy = (newHeight - size.height) / 2
    return {
      x: dx,
      y: dy
    }
  }
  private checkSize(element: ElementRef) {
    if (!this.trasitionsStarted) {
      this.originalSize = {
        width: element.nativeElement.clientWidth,
        height: element.nativeElement.clientHeight,
      }
      this.trasitionsStarted = true;
    }
  }
}
