import {Component, OnDestroy, OnInit} from '@angular/core';

import {ActivatedRoute, Params} from '@angular/router';
import {EventsService} from '../../shared/services/events.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {WFMEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';
import { Subscription} from 'rxjs';

@Component({
  selector: 'wfm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: WFMEvent;
  category: Category;

  s1: Subscription;
  isLoaded = false;

  constructor(
    // доступ к текущему url
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.s1 = this.route.params.subscribe((params: Params) => {
      this.eventsService.getEventById(params['id']).subscribe((event: WFMEvent) => {
        this.event = event;
        this.categoriesService.getCategoryById(event.category).subscribe((category: Category) => {
          this.category = category;
          this.isLoaded = true;
        });
      });
    });
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
