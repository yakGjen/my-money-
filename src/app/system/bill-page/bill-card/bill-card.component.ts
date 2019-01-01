import {Component, Input, OnInit} from '@angular/core';

import {Bill} from '../../shared/models/bill.model';

@Component({
  selector: 'wfm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: object;

  dollar: number;
  euro: number;

  constructor() { }

  ngOnInit() {
    //console.log(this.currency);
    this.dollar = this.calcCurrency('USD');
    this.euro = this.calcCurrency('EUR');
  }

  calcCurrency(currency) {
    return this.bill.value / this.currency[currency].Cur_OfficialRate;
  }

}
