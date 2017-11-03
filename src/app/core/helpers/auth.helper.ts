export class AuthHelper {

  /** The userId constant*/
  static USER_ID = 'user';

  /** The TOKEN_ID constant*/
  static TOKEN_ID = 'token';

  /**
   * Search the value of an specific cookie
   * @param name the name of the cookie to search
   */
  static getCookie(name: string) {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = name + '=';
    let c: string;
    for (let i = 0; i < caLen; i += 1) {
      c = ca[i].trim();
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  /**
   * Convert from seconds to a valid UTC date in string format
   * @param seconds the total amount of seconds
   */
  static changeExpiredTime(seconds: number): string {
    const now = new Date();
    now.setTime(now.getTime() + (seconds * 1000));
    return now.toUTCString();
  }

  /**
   * Add user id to the cookie
   * @param value the value of the user id
   * @param expiredTime the total seconds after the page should expire
   */
  static addUserInfo(value: string, expiredTime: number) {
    const expiredTimeString = AuthHelper.changeExpiredTime(expiredTime);
    document.cookie = AuthHelper.USER_ID + '=' + value + '; expires=' + expiredTimeString + '; path=/';
  }

  /**
   * Add token to the cookie
   * @param token the token with all the info
   * @param expiredTime the total seconds after the page should expire
   */
  static addTokenInfo(token: string, expiredTime: number) {
    const expiredTimeString = AuthHelper.changeExpiredTime(expiredTime);
    document.cookie = AuthHelper.TOKEN_ID + '=' + token + '; expires=' + expiredTimeString + '; path=/';
  }

  /**
   * Remove the user id from the cookie
   */
  static removeUserInfo() {
    const expiredTimeString = AuthHelper.changeExpiredTime(0);
    document.cookie = AuthHelper.USER_ID + '=; expires=' + expiredTimeString + '; path=/';
  }

  /**
   * Remove the token from the cookie
   */
  static removeTokenInfo() {
    const expiredTimeString = AuthHelper.changeExpiredTime(0);
    document.cookie = AuthHelper.TOKEN_ID + '=; expires=' + expiredTimeString + '; path=/';
  }

  /**
   * Clear the cookies related to authentication
   */
  static clearCookies() {
    this.removeUserInfo();
    this.removeTokenInfo();
  }

  /**
   * Determine if a value is empty or not
   * @param val the value to check
   */
  static isEmpty(val: any): boolean {
    if (val === undefined || val == null) {
      return true;
    }
    if (typeof val === 'string') {
      return val.trim().length <= 0;
    }
    if (typeof val === 'number') {
      return val <= 0;
    }
    return ('' + val).trim().length === 0;
  }

  /**
   * Determine if there is a user correctly logged in the app
   */
  static isUserLogged(): boolean {
    const userId = this.getUserLogged();
    const token = this.getToken();
    return (!AuthHelper.isEmpty(userId) && !AuthHelper.isEmpty(token));
  }

  /**
   * Returns the name of the user logged in the app
   */
  static getUserLogged(): string {
    return AuthHelper.getCookie(AuthHelper.USER_ID);
  }

  /**
   * Returns the token stored after login
   */
  static getToken(): string {
    return AuthHelper.getCookie(AuthHelper.TOKEN_ID);
  }

  /**
   * If user is not logged go to the login page
   */
  static checkAuthentication() {
    if (!this.isUserLogged()) {
      location.href = location.pathname + '#/login';
    }
  }
}
