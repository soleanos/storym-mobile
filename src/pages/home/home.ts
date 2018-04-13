import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { UtilsProvider } from '../../providers/utils/utils';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  test = 'mdr';

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public utils: UtilsProvider) {

  }

  doLogout() {
    this.afAuth.auth.signOut().then(() => {
      this.utils.showToast('You have been successfully logged out!');
      this.navCtrl.setRoot(LoginPage);
    }).catch(err => this.utils.showToast(err.message));
  }

}
