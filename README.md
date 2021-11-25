# ionic-hammer-gestures
A simple international telephone number input. Allows you to create a phone number field with country dropdown. 

![Plugin preview](https://raw.githubusercontent.com/okanbeydanol/ionic-hammer-gestures/master/demoApp/video/hammer-gestures.gif)

## Installation

To install this library, run:

```bash
$ npm install ionic-hammer-gestures --save
```

## Consuming your library

Once you have installed it you can import `InonicHammerGestureModule` from `ionic-hammer-gestures` in any application module. E.g.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { InonicHammerGestureModule } from 'ionic-hammer-gestures';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // InonicHammerGestureModule module
    InonicHammerGestureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once it is imported, you can use `<img></img>`:

```xml
<!-- app.component.html -->
 <img [src]="url" pan pinch tap press doubletap swipe transitionactive="active" 
 (panChange)="panChange($event)"
 (pinchChange)="pinchChange($event)"
 (tapChange)="tapChange($event)"
 (pressChange)="pressChange($event)"
 (doubletapChange)="doubletapChange($event)"
 (swipeChange)="swipeChange($event)"
 ></img>
```
## License

MIT
