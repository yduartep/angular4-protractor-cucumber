import {Component, OnInit} from '@angular/core';
import {User} from './core/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    if (localStorage.getItem('users') == null) {
      const user = new User();
      user.id = 999;
      user.username = 'guest';
      user.password = 'guest123';
      user.firstName = 'Guest';
      user.lastName = 'Guess';
      localStorage.setItem('users', JSON.stringify([user]));
    }
  }
}
