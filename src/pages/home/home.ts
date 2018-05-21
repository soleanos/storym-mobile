import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { UtilsProvider } from '../../providers/utils/utils';
import { StoryService} from '../../services/story.service';
import { Story } from '../../model/Story';
import { Mark } from '../../model/Mark';
import { ReadPage } from '../read/read';
import { CategoryService} from '../../services/category.service';
import { Category } from '../../model/Category';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { GetStoryMarkPipe } from '../../pipes/get-story-mark';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  stories: Story[];
  storiesTmp : Story[];
  categories: Category[];
  filterOpened : boolean;
  auth : any;
  mark : Mark;
  @Input() selected = 'Tout voir';

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public utils: UtilsProvider,private storyService: StoryService,
    private categoryService : CategoryService,private userService : UserService,  private authService: AuthService,private markPipe : GetStoryMarkPipe,
    private alertCtrl: AlertController
  ) {
    this.stories = new Array<Story>();
  }

  /** recupère l'ensemble deshistoires en base */
  getStories(): void {
    this.storyService.getStories()
    .subscribe(stories =>  this.fillStories(stories));
  }

  /**
   * Récuprer l'ensemble des catégories
   */
  getCategories(): void {
    this.categoryService.getCategories()
    .subscribe(categories => this.fillCategories(categories));
  }

  /**
   * 
   * @param stories Alimente les 
   */
  fillStories(stories:any[]): void {
     
    for (let story of stories) {
      this.markPipe.transform(story)
    }

    this.storiesTmp = stories;
    this.stories = this.storiesTmp;
  }
  
  /**
   * Alimente la liste des catégories, et ajoute le libellé "tout voir", 
   * car il n'est pas sotckée en base de manière a ne pas figurer dans 
   * la liste de proposition de categ en étape de création d'histoire
   * @param categories 
   */
  fillCategories(categories:any[]): void {
    categories.push({label:'Tout voir'});
    this.categories = categories;
  }

  ngOnInit() {
    this.getStories();
    this.getCategories();
    this.filterOpened = false;
    this.fillAuth();
  }

  /**
   * Lancer la lecture d'une histoire
   * @param storyId 
   */
  read(storyId : string) {
    this.navCtrl.push(ReadPage, {
      'id': storyId 
    })
  }

  /**
   * Recommancer une histoire, en supprimant le marque page associé 
   * @param storyId 
   */
  reload(storyId : string) {
    this.userService.deleteMark(this.auth.uid,storyId);
  }

  /**
   * Continuer une histoire avec marque page
   * @param story 
   */
  continue(story : Story) {
    this.navCtrl.push(ReadPage, {
      'id': story.id,
      'mark':story.mark     
    })
  }

  /**
   * Filtrage
   * @param ev 
   */
  filterItems(ev: any) {
    this.filterByCategory(this.selected);

    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.stories = this.stories.filter(function(item) {
        return item.title.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  /**
   * Filtrage par catégorie
   * @param selected 
   */
  filterByCategory(selected: string){
    this.stories = this.storiesTmp;
    if(selected != 'Tout voir'){
      this.stories = this.stories.filter(function(item) {
        return item.category.toLowerCase().includes(selected.toLowerCase());
      });
    }
  }

  /**
   * Alimenter l'objet authentification 
   */
  fillAuth (){
    this.authService.getAuth().subscribe(auth=>
      this.auth = auth
    )
  }

/**
 * Alimenter le mark page
 * @param mark 
 */
  fillMark(mark : Mark){
    this.mark = mark;
  }

    /**
   * Permet l'ouverture ou la fermeture de la partie filtrage/recherche
   */
  openFiltering(){
    this.filterOpened = !this.filterOpened;
  }

  checkIfAlreadyReported(story:Story){
    if(!story.reports){return true}
    return story.reports.filter(report => report == this.auth.uid).length > 1;
  }

  /**
   * Ouvre la fene^tre modale de signalement
   */
  signaler(story:Story) {
    let alert = this.alertCtrl.create({
      title: 'Signaler cette histoire',
      message: 'Etes vous sur de vouloir signaler cette histoire ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => { 
            console.log('Signalement annulé');
          }
        },
        {
          text: 'Signaler',
          handler: () => {
            this.addReportToStory(story);
            this.utils.showToast('Votre signalement a été pris en compte');
          }
        }
      ]
    });
    alert.present();
  }

  addReportToStory(story : Story){
    if(!story.reports){
      story.reports = new Array<string>();
    }
    story.reports.push(this.auth.uid);
    if(story.reports.length === 10){
      story.status = 3;
    }

    if(typeof story.mark === "undefined"){
      delete story.mark;
    }

    this.storyService.updateStory(story);
  }

  /**
   * Déconnection de l'utilisateur identifié
   */
  doLogout() {
    this.afAuth.auth.signOut().then(() => {
      this.utils.showToast('Vous êtes désormais déconnecté');
      this.navCtrl.setRoot(LoginPage);
    }).catch(err => this.utils.showToast(err.message));
  }


}