/*
 MIT License

 Copyright (c) 2018 Temainfo Sistemas

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
  Component, Optional, Inject, ContentChildren, QueryList, Input, AfterContentInit, ViewChild, AfterViewInit, Output,
  EventEmitter, Injector,
} from '@angular/core';

import { TlRadioButton } from './radiobutton';
import { MakeProvider } from '../core/base/value-accessor-provider';
import { KeyEvent } from '../core/enums/key-events';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';
import { ElementBase } from '../input/core/element-base';

const Orientation = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};

@Component( {
  selector: 'tl-radio-group',
  templateUrl: './radiogroup.html',
  styleUrls: [ './radiobutton.scss' ],
  providers: [
    [ MakeProvider( TlRadioGroup ) ]
  ]
} )
export class TlRadioGroup extends ElementBase<string> implements AfterContentInit, AfterViewInit {

  public itemSelected;

  @Input() nameGroup = '';

  @Input() labelGroup = '';

  @Input() orientation = Orientation.HORIZONTAL;

  @Input() colorSelected = '';

  @ViewChild( 'radiobutton' ) radiobutton;

  @ViewChild( NgModel ) model: NgModel;

  @ContentChildren( TlRadioButton ) listRadioButton: QueryList<TlRadioButton>;

  @Output() private onCheckRadio: EventEmitter<any> = new EventEmitter();

  @Output() private onFocusRadio: EventEmitter<any> = new EventEmitter();

  constructor( @Optional() @Inject( NG_VALIDATORS ) validators: Array<any>, @Optional() @Inject( NG_ASYNC_VALIDATORS )
    asyncValidators: Array<any>, injector: Injector ) {
    super( validators, asyncValidators, injector );
  }

  ngAfterContentInit() {
    this.handleInitialValue();
    this.setInitialSettings();
  }

  ngAfterViewInit() {
    this.validateProperty();
    this.validateCheckedRadios();
  }

  validateProperty() {
    if ( (this.orientation !== Orientation.VERTICAL) && (this.orientation !== Orientation.HORIZONTAL) ) {
      throw new EvalError( 'The property [orientation] only receive /vertical/ and /horizontal/ values!' );
    }
  }

  handleInitialValue() {
      if ( this.value ) {
        this.handleModelValue();
      } else {
        this.checkFirstItem();
        this.handleChecked();
      }
  }

  handleModelValue() {
    this.listRadioButton.toArray().forEach( ( item, index, array ) => {
      if ( this.value === item.value ) {
        this.itemSelected = item;
      }
    } );
  }

  handleChecked() {
    this.listRadioButton.toArray().forEach( ( item ) => {
        this.setItemChecked( item );
    } );
  }

  handleKeyDown( $event: KeyboardEvent ) {
    switch ( $event.keyCode ) {
      case KeyEvent.ARROWDOWN:
        $event.preventDefault();
        break;
      case KeyEvent.ARROWUP:
        $event.preventDefault();
        break;
    }
  }

  setInitialSettings() {
    this.listRadioButton.toArray().forEach( ( item ) => {
      this.setNameRadioButton( item );
    } );
  }

  setNameRadioButton( item ) {
    item.name = this.nameGroup;
  }

  setItemChecked( item ) {
    if ( item.checked ) {
      return this.checkRadio( item );
    }
  }

  checkFirstItem() {
    setTimeout( () => {
      this.checkRadio( this.listRadioButton.toArray()[ 0 ] );
    }, 1 );
  }

  getCheckedRadios() {
    return this.listRadioButton.filter( ( item ) => {
      return item.checked;
    } );
  }

  validateCheckedRadios() {
    if ( this.getCheckedRadios().length > 1 ) {
      throw new EvalError( 'Only one radiobutton with [checked] property is allowed' );
    }
  }

  checkRadio( item ) {
    this.value = item.value;
    this.itemSelected = item;
    this.onCheckRadio.emit( this.itemSelected );
  }

  focusRadio( item ) {
    this.onFocusRadio.emit( item );
  }
}

