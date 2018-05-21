import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { UtilsProvider } from '../../providers/utils/utils';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ForgetPage } from '../forget/forget';
import * as firebase from 'firebase/app';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loginForm: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, 
    public afAuth: AngularFireAuth, public utils: UtilsProvider, public plt: Platform,private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  doLogin() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then(res => this.handleResponse(res))
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
        .then(res => this.handleResponse(res))
        .catch(err => this.handleError(err));
    }
    else {
      // It will work only in browser
      this.afAuth.auth.signInWithPopup(provider)
        .then(res => this.handleResponse(res))
        .catch(err => this.handleError(err));
    }
  }

  handleResponse(res:any) {
    // console.log(res);
    // if(res.additionalUserInfo.isNewUser){
      if(res){
        this.userService.setUserAccount(res);
        this.utils.showToast('Vous êtes désormais identifié');
        this.navCtrl.setRoot(HomePage);
      }
     
    //   console.log(res.additionalUserInfo.isNewUser);
    //   this.utils.showToast('Compte crée ');
    // }

  }

  handleError(err) {
    this.utils.showToast(err.message)
  }

}
