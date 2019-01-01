import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'wfm-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency;
  date = new Date();

  rateUsd: number;
  rateEur: number;
  rateRub: number;

  constructor() { }

  ngOnInit() {
    this.rateUsd = this.getRate('USD');
    this.rateEur = this.getRate('EUR');
    this.rateRub = this.getRate('RUB');
  }

  getRate(currency: string) {
    return this.currency[currency].Cur_OfficialRate;
  }

}
