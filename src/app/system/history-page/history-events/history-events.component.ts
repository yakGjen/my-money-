import {Component, Input, OnInit} from '@angular/core';

import {WFMEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'wfm-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: WFMEvent[] = [];

  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((event) => {
      event.catName =  this.categories.find(c => c.id === event.category).name;
    });
  }

  getEventClass(event: WFMEvent) {
    return {
      'label': true,
      'label-danger': event.type === 'outcome',
      'label-success': event.type === 'income'
    };
  }

  changeCriteria(field: string) {
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
