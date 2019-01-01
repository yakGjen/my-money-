import {Injectable} from '@angular/core';
import {HttpClient } from '@angular/common/http';

import {BaseApi} from '../core/base-api';
import {Bill} from '../models/bill.model';

@Injectable()

export class BillService extends BaseApi{

  constructor(public http: HttpClient) {
    super(http);
  }

  getBill() {
    return this.get('bill');
  }

  updateBill(bill: Bill) {
    return this.put('bill', bill);
  }

  getCurrency(id: string = '') {
    return this.http.get(`http://www.nbrb.by/API/ExRates/Rates${id}?Periodicity=0`);
  }

}
// http://www.nbrb.by/API/ExRates/Currencies
