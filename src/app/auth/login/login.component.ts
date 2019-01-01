import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';


@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    // переменная для получения сообщения из комп-а регистрации
    private route: ActivatedRoute,
    // установка title-ов для seo
    private title: Title,
    // добавление мета-тегов
    private meta: Meta
  ) {
    title.setTitle('Вход в систему');
    meta.addTags([
      {name: 'keywords', content: 'догин,вход,система'},
      {name: 'description', content: 'Страница для входа в систему'}
    ]);
  }

  ngOnInit() {
    this.message = new Message('danger', '');

    // получение сообщения из комп-а регистрации (объект поля queryParams)
    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage({
          text: 'Теперь вы можете зайти в систему',
          type: 'success'
        });
      } else if (params['accessDenied']) {
        this.showMessage({
          text: 'Для работы с системой вам необходимо войти',
          type: 'warning'
        });
      }
    });

    this.form = new FormGroup({
      /* передаём поля в кавычках во избежание конфликта при минификации */
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    /* получение объекта с полями формы */
    const formData = this.form.value;

    /* если пользователь есть, возвращается его оъект в массиве, иначе пустой массив */
    this.usersService.getUsersByEmail(formData.email).subscribe((response: User) => {
      const user = response[0] ? response[0] : undefined;

      if (user) {
        if (user.password === formData.password) {
          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.login();
          this.router.navigate(['/system', 'bill']);
        } else {
          this.showMessage({
            text: 'Пароль не верный',
            type: 'danger'
          });
        }
      } else {
        this.showMessage({
          text: 'Такого пользователя не сущесвует',
          type: 'danger'
        });
      }

    });

  }

}
