import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SenderService {
  BASE_URL: string = 'http://localhost:3000';

  private loggedInSource = new Subject<any>();

  loggedIn$ = this.loggedInSource.asObservable();
  // app component will subscribe to "loggedIn$"
  
  constructor(
    private http: Http
    ) { }

  loggedIn(userInfo) {
    this.loggedInSource.next(userInfo);
  }
  
  isLoggedIn () {
  return this.http
  .get(
    this.BASE_URL + '/loggedin',
   {withCredentials: true}
   )
    .toPromise()
    .then(res => res.json());
  }

login (credentials) {
    return this.http
    .post(
      this.BASE_URL + '/login',
      credentials,
     {withCredentials: true}
     )
    .toPromise()
    .then((res) => res.json());
  }




  signup (user) {
    return this.http
    .post(
        this.BASE_URL + '/signup',
         user,
         { withCredentials: true }
         )
         .toPromise()
        .then(res => res.json());
  }

logout() {
      return this.http
        .post(
          this.BASE_URL + '/logout',
          {},
          { withCredentials: true }
        )
        .toPromise()
        .then(res => res.json());
  }
  handleError(e) {
    return Observable.throw(e.json().message);
  }




  getProfile() {
    return this.http.get(this.BASE_URL + '/profile',
    {withCredentials: true}
    )
      .toPromise()
        .then(res => res.json());
  }


}







