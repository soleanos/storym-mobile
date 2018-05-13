import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase/app';
import { User } from 'firebase/app';


@Injectable()
export class AuthService {
    private auth: Observable<firebase.User>;
    public authenticated: Observable<boolean>;
    public uid: Observable<string>;
    private error: any;
    private currentUser: Observable<User>;

    constructor(private af: AngularFireAuth ) {
      this.auth = af.authState;
      this.authenticated = this.auth.map( user => !!user && !user.isAnonymous);
      this.uid = this.auth.map(user => user.uid);
    }

    public getAuth(): Observable<firebase.User> {
      return this.auth;
    }

}
