import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthHelper} from '../helpers/auth.helper';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) {
  }

  login(username: string, password: string) {
    return this.http.post('/api/authenticate', JSON.stringify({username: username, password: password}))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));

          // save information in the cookie
          const expiresIn = 1200;
          AuthHelper.addUserInfo(username, expiresIn);
          AuthHelper.addTokenInfo(user.token, expiresIn);
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    AuthHelper.clearCookies();
  }
}
