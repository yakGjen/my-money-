import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../models/user.model';
import {BaseApi} from '../../system/shared/core/base-api';

@Injectable()

export class UsersService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUsersByEmail(email: string) {
    return this.get(`users?email=${email}`);
  }

  createNewUser(user: User) {
    return this.post('users', user);
  }

}
