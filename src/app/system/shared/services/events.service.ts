import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BaseApi} from '../core/base-api';
import {WFMEvent} from '../models/event.model';

@Injectable()

export class EventsService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: WFMEvent) {
    return this.post('events', event);
  }

  getEvents() {
    return this.get('events');
  }

  getEventById(id: string) {
    return this.get(`events/${id}`);
  }
}
