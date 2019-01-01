import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import * as moment from 'moment';

import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Category} from '../shared/models/category.model';
import {WFMEvent} from '../shared/models/event.model';


@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  events: WFMEvent[] = [];
  filteredEvents: WFMEvent[] = [];

  isFilterVisible = false;
  isLoaded = false;
  s1: Subscription;

  chartData = [];

  constructor(
    private categoryService: CategoriesService,
    private eventService: EventsService
    ) { }

  ngOnInit() {
    this.s1 = combineLatest(
      this.categoryService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Category[], WFMEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];

      this.setOriginalEvents();
      this.calculateChartData();

      this.isLoaded = true;
    });
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  calculateChartData() {
    this.chartData = [];
    this.categories.forEach((category) => {
      const catEvents = this.filteredEvents.filter((event: any) => event.category === category.id && event.type === 'outcome');
      this.chartData.push({
        name: category.name,
        value: catEvents.reduce((sum, item: any) => {
          sum += item.amount;
          return sum;
        }, 0)
      });
    });
  }

  private toogleFilterVisibility(direction: boolean) {
    this.isFilterVisible = direction;
  }

  openFilter() {
    this.toogleFilterVisibility(true);
  }

  onFilterApply(filterData) {
    this.toogleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((event) => {
        return filterData.types.indexOf(event.type) !== -1;
      })
      .filter((event) => {
        return filterData.categories.indexOf(event.category.toString()) !== -1;
      })
      .filter((event) => {
        const momentDate = moment(event.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();
  }

  onFilterCancel() {
    this.toogleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
