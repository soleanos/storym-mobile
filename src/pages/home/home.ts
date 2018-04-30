import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { UtilsProvider } from '../../providers/utils/utils';
import { StoryService} from '../../services/story.service';
import { Story } from '../../model/Story';
import { ReadPage } from '../read/read';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @Input() stories: Story[];
  test = 'mdr';

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public utils: UtilsProvider,private storyService: StoryService,) {

  }

  getStories(): void {
    this.storyService.getStories()
    .subscribe(stories => this.stories = stories);
  }

  doLogout() {
    this.afAuth.auth.signOut().then(() => {
      this.utils.showToast('You have been successfully logged out!');
      this.navCtrl.setRoot(LoginPage);
    }).catch(err => this.utils.showToast(err.message));
  }

  ngOnInit() {
    this.getStories();
  }

  read(storyId : string) {
    this.navCtrl.push(ReadPage, {
      'id': storyId
    })
  }

}
