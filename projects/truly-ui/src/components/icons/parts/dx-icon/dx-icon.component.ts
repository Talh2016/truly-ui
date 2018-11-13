import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dx-icon',
  templateUrl: './dx-icon.component.html',
  styleUrls: ['./dx-icon.component.scss']
})
export class DxIconComponent implements OnInit {

  public format: string;

  public PREFIX = 'dx-icon dx-icon-';

  @Input() icon: string;

  @Input() size: string;

  @Input() animation: string;

  @Input() color: string;

  @Input() align: string;

  constructor() { }

  ngOnInit() {
    this.format = this.PREFIX + this.icon;
    this.format += (this.animation) ? ' anim-' + this.animation + ' animated' : '';
    this.format += (this.align) ? ' pull-' + this.align : '';
  }

}
