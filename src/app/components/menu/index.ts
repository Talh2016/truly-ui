import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscModule } from '../misc/index';
import { TlMenu } from './menu';
import { TlSimpleSubMenu } from './parts/simple/simple-sub-menu';
import { TlAdvancedSubMenu } from './parts/advanced/parts/advanced-sub-menu';
import { TlAdvancedRootMenu } from './parts/advanced/advanced-root-menu';
import { FormsModule } from '@angular/forms';
import { BlockUIModule } from '../blockui/index';

export * from './menu';

@NgModule( {
  imports: [
    CommonModule,
    MiscModule,
    BlockUIModule,
    FormsModule
  ],
  declarations: [
    TlMenu,
    TlAdvancedRootMenu,
    TlAdvancedSubMenu,
    TlSimpleSubMenu
  ],
  exports: [
    TlMenu,
    TlAdvancedRootMenu,
    TlAdvancedSubMenu,
    TlSimpleSubMenu
  ],
  entryComponents: [ TlSimpleSubMenu, TlAdvancedSubMenu, TlAdvancedRootMenu ]
} )
export class MenuModule {
}
