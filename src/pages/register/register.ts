import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private registerForm: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public afAuth: AngularFireAuth, public utils: UtilsProvider) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  doRegister() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
      .then(() => {
        this.utils.showToast('User created successfully!');
      })
      .catch(err => this.utils.showToast(err.message));
  }


}
