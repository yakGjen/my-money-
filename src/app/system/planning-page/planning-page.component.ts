import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';

import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Bill} from '../shared/models/bill.model';
import {Category} from '../shared/models/category.model';
import {WFMEvent} from '../shared/models/event.model';

@Component({
  selector: 'wfm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  s1: Subscription;

  bill: Bill;
  categories: Category[] = [];
  events: WFMEvent[] = [];

  constructor(
    private billService: BillService,
    private categoryService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.s1 = combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Bill, Category[], WFMEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    });
  }

  getCategoryCost(category: Category) {
    const catEvents = this.events.filter((event: any) => {
      if (event.category === category.id && event.type === 'outcome') {
        return true;
      }
    });
    //вторым параметром передаётся начальное значение
    return catEvents.reduce((sum, event: any) => {
      sum += event.amount;
      return sum;
    }, 0);
  }

  private getPercent(category: Category) {
    const percent = (100 * this.getCategoryCost(category)) / category.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(category: Category) {
    return this.getPercent(category) + '%';
  }
  getCatColorClass(category: Category) {
    const percent = this.getPercent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
