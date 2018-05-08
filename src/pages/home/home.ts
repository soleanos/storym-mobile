import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { UtilsProvider } from '../../providers/utils/utils';
import { StoryService} from '../../services/story.service';
import { Story } from '../../model/Story';
import { ReadPage } from '../read/read';
import { CategoryService} from '../../services/category.service';
import { Category } from '../../model/Category';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  stories: Story[];
  storiesTmp : Story[];
  categories: Category[];
  categorySelected: Category;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public utils: UtilsProvider,private storyService: StoryService,
    private categoryService : CategoryService
  ) {
    this.stories = new Array<Story>();
  }

  getStories(): void {
    this.storyService.getStories()
    .subscribe(stories =>  this.fillStories(stories));
  }

  fillStories(stories:any[]): void {
    this.storiesTmp = stories;
    this.stories = this.storiesTmp;
  }
  
  getCategories(): void {
    this.categoryService.getCategories()
    .subscribe(categories => this.categories = categories);
  }

  doLogout() {
    this.afAuth.auth.signOut().then(() => {
      this.utils.showToast('You have been successfully logged out!');
      this.navCtrl.setRoot(LoginPage);
    }).catch(err => this.utils.showToast(err.message));
  }

  ngOnInit() {
    this.getStories();
    this.getCategories();
  }

  read(storyId : string) {
    this.navCtrl.push(ReadPage, {
      'id': storyId
    })
  }

  filterItems(ev: any) {
    this.stories = this.storiesTmp;
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.stories = this.stories.filter(function(item) {
        return item.title.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  filterByCateg(category : string) {
    this.stories = this.storiesTmp;
    this.stories = this.stories.filter(function(item) {
      return item.category.toLowerCase().includes(category.toLowerCase());
    });
  }

}
