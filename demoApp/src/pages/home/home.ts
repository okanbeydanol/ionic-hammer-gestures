import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  src;
  constructor(public navCtrl: NavController, private domSanitizer: DomSanitizer) {
    this.src = this.domSanitizer.bypassSecurityTrustUrl('https://www.hobisi.com/wp-content/uploads/2019/05/resim-nedir-turleri-ve-stilleri.jpg');
  }

}
