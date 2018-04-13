import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { UtilsProvider } from '../../providers/utils/utils';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ForgetPage } from '../forget/forget';
import * as firebase from 'firebase/app';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loginForm: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public afAuth: AngularFireAuth, public utils: UtilsProvider, public plt: Platform) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  doLogin() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then(res => this.handleResponse())
      .catch(err => this.handleError(err));
  }

  navForget() {
    this.navCtrl.push(ForgetPage);
  }

  navRegister() {
    this.navCtrl.push(RegisterPage);
  }

  doSocialLogin(social: string) {
    let provider: any;
    if (social == 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
    } else if (social == 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    } else if (social == 'twitter') {
      provider = new firebase.auth.TwitterAuthProvider();
    } else {
      provider = new firebase.auth.GithubAuthProvider();
    }

    if (this.plt.is('cordova')) {
      this.afAuth.auth.signInWithRedirect(provider)
        .then(res => this.handleResponse())
        .catch(err => this.handleError(err));
    }
    else {
      // It will work only in browser
      this.afAuth.auth.signInWithPopup(provider)
        .then(res => this.handleResponse())
        .catch(err => this.handleError(err));
    }
  }

  handleResponse() {
    this.utils.showToast('You are successfully logged in');
    this.navCtrl.setRoot(HomePage);
  }

  handleError(err) {
    this.utils.showToast(err.message)
  }

}
