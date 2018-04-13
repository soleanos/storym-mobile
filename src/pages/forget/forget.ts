import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the ForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {
  private forgetForm: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public afAuth: AngularFireAuth, public utils: UtilsProvider) {
    this.forgetForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])]
    });
  }

  doForget() {
    this.afAuth.auth.sendPasswordResetEmail(this.forgetForm.value.email)
      .then(() => {
        this.utils.showToast('Forgot Password Email Sent');
        this.navCtrl.pop();
      })
      .catch(err => this.utils.showToast(err.message));
  }
}
