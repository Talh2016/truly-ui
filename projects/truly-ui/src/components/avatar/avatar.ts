/*
    MIT License

    Copyright (c) 2018 Temainfo Software

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output
} from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'tl-avatar',
  templateUrl: './avatar.html',
  styleUrls: ['./avatar.scss'],
})
export class TlAvatar implements OnInit, OnChanges {

  @Input() shape = 'square';

  @Input() size = '100px';

  @Input() src: string;

  @Input() gravatar: string;

  @Input() icon: string;

  @Input() text: string;

  @Input() fontColor: string;

  @Input() bgColor: string;

  @Input() gender: 'female' | 'male' = 'male';

  @Input() color = 'basic';

  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  public type = 'gender';

  public multiplierIcon;

  public multiplierText;

  public fontSize;

  constructor() {
  }

  ngOnInit() {
    this.defineType();
  }

  defineType() {
    if ( this.src && this.src !== '' ) {
      this.type = 'src';
      return;
    }
    if ( this.gravatar && this.gravatar !== '' ) {
      const sizeGravatar = ( this.isPercentage() ) ? '200px' : this.size;
      this.gravatar = `//www.gravatar.com/avatar/${Md5.hashStr(this.gravatar)}?s=${sizeGravatar}&d=mm`;
      this.type = 'gravatar';
      return;
    }
    if ( this.icon && this.icon !== '' ) {
      this.multiplierIcon = ( this.isPercentage() ) ? 25 : 0.7;
      this.type = 'icon';
      return;
    }
    if ( this.text && this.text !== '' ) {
      this.multiplierText = ( this.isPercentage() ) ? 8 : 0.2;
      this.fontSize = ( this.isOneCharacter() ) ? '2em' : '1em';
      this.type = 'text';
      return;
    }
  }

  isPercentage() {
    return this.size.substr(this.size.length - 1) === '%';
  }

  isOneCharacter() {
    return this.text && this.text.length === 1;
  }

  selectedAvatar($event) {
    this.selected.emit($event);
  }

  ngOnChanges( changes ) {
    this.defineType();
  }

}
