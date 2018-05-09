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
  filterOpened : boolean;
  @Input() selected = 'Tout voir';

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public utils: UtilsProvider,private storyService: StoryService,
    private categoryService : CategoryService
  ) {
    this.stories = new Array<Story>();
  }

  openFiltering(){
    this.filterOpened = !this.filterOpened;
  }

  getStories(): void {
    this.storyService.getStories()
    .subscribe(stories =>  this.fillStories(stories));
  }

  fillStories(stories:any[]): void {
    this.storiesTmp = stories;
    this.stories = this.storiesTmp;
  }
  
  fillCategories(categories:any[]): void {
    categories.push({label:'Tout voir'});
    this.categories = categories;
  }

  getCategories(): void {
    this.categoryService.getCategories()
    .subscribe(categories => this.fillCategories(categories));
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
    this.filterOpened = false;
  }

  read(storyId : string) {
    this.navCtrl.push(ReadPage, {
      'id': storyId
    })
  }

  filterItems(ev: any) {
    // this.stories = this.storiesTmp;

    this.filterByCategory(this.selected);

    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.stories = this.stories.filter(function(item) {
        return item.title.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  filterByCategory(selected: string){
    this.stories = this.storiesTmp;
    if(selected != 'Tout voir'){
      this.stories = this.stories.filter(function(item) {
        return item.category.toLowerCase().includes(selected.toLowerCase());
      });
    }
  }

}