import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';

import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/models/bill.model';

// НБРБ
const moneyId = {
  USD: '/145',
  EUR: '/292',
  RUB: '/298'
};

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})

export class BillPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  currency: object = {
    USD: '',
    EUR: '',
    RUB: ''
  };
  bill/*: Bill*/;
  isLoaded = false;

  constructor(
    private billService: BillService
  ) { }

  ngOnInit() {
    // синхронизация возвращаемых ответов в виде массива
    this.subscription = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency(moneyId.USD),
      this.billService.getCurrency(moneyId.EUR),
      this.billService.getCurrency(moneyId.RUB),
    ).subscribe((data) => {
      this.bill = data[0];
      this.currency['USD'] = data[1];
      this.currency['EUR'] = data[2];
      this.currency['RUB'] = data[3];
      this.isLoaded = true;
    });
  }

  onRefresh() {
    this.billService.getCurrency(moneyId.USD).subscribe((currency: any) => {
      this.currency['USD'] = currency;
    });
    this.billService.getCurrency(moneyId.EUR).subscribe((currency: any) => {
      this.currency['EUR'] = currency;
    });
    this.billService.getCurrency(moneyId.RUB).subscribe((currency: any) => {
      this.currency['RUB'] = currency;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
