import { Component, OnInit } from '@angular/core';
import { Story } from '../../model/Story';
import { StoryService } from '../../services/story.service';
import { SliceService } from '../../services/slice.service';
import { Slice } from '../../model/Slice';
import { Choice } from '../../model/Choice';
import { Mark } from '../../model/Mark';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ReadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-read',
  templateUrl: 'read.html',
})
export class ReadPage {

  story: Story;
  slices: Slice[];
  slicesOfStory: Slice[];
  slice: Slice;
  choices: Choice[];
  @ViewChild(Content) content: Content;
  
  constructor(
    public navCtrl: NavController,
    private storyService: StoryService,
    public navParams: NavParams,
    private sliceService: SliceService,
    private userService: UserService,
    private authService: AuthService,
    private alertCtrl: AlertController
    ) {
      this.slicesOfStory = new Array<Slice>();
      this.choices = new Array<Choice>();
      this.slice = new Slice();
    }

    async scrollTo(element:string) {
    await this.delay(300);
    let yOffset = document.getElementById(element).offsetTop;
    this.content.scrollTo(0, yOffset, 4000)
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    const mark : Mark = this.navParams.get('mark');
    
    if(mark){
      this.fillMark(mark);
      this.slice = this.slicesOfStory[this.slicesOfStory.length-1]; 
      this.scrollTo(this.slice.id);
    }else{
      this.getFirstSlice(id);
    }
    this.getStory(id);
    this.getSlices(id);
  }

   delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }

  /**
   * Récupère l'histoire correspondant à l'id passé en paramètre
   * @param id
   */
  fillMark(mark:Mark): void {
    this.slicesOfStory = mark.slices;
  }

  /**
   * Récupère l'histoire correspondant à l'id passé en paramètre
   * @param id
   */
  getStory(id: string): void {
    this.storyService.getStory(id)
      .subscribe(story => this.story = story);
  }

  /**
   * Récupère le premier passage de l'histoire
   * @param id
   */
  getFirstSlice(id: string): void {
    this.sliceService.getSlicesOfStory(id)
      .subscribe(
        slices => this.addFirstSlice(slices.find(item => item.level === 0)),
    );
  }
  /**
   * Ajoute le première passage à l'histoire
   * @param slice
   */
  addFirstSlice(slice:  Slice) {
    this.slicesOfStory.push(slice);
    this.slice = slice;
  }
  /**
   * Récupère le passage correspondant au choix sur lequel on a cliqué
   * @param sliceId
   */
  getnextLinkedSlice(sliceId: String): any {
     return this.slices.filter(x => x.id === sliceId)[0];
  }

  /**
   * Ajoute le nouveau passage à la liste des passages
   * @param choice
   */
  addNextSliceToStory(choice: Choice) {
    const nextSlice: Slice = this.getnextLinkedSlice(choice.nextSliceId);
    this.slicesOfStory.push(nextSlice);
    this.slice = nextSlice;
   
    this.scrollTo(nextSlice.id);
  }

  /**
   * Récupère tous les passages de l'histoire
   * @param id
   */
  getSlices(id: string): void {
    this.sliceService.getSlicesOfStory(id)
      .subscribe(slices => this.slices = slices);
  }
  
  ionViewDidLoad() {
    // console.log('ionViewDidLoad ReadPage');
  }

  markPage(){
    let mark : Mark = {
      slices : this.slicesOfStory
    };
    this.authService.getAuth().subscribe(auth=>
      this.userService.addMark(auth.uid,this.story.id,mark)
    )
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Signaler cette histoire',
      message: 'Etes vous sur de vouloir signaler cette histoire ?',
      buttons: [
        {
          text: 'gdfdgd',
          role: 'cancel',
          handler: () => {
            console.log('Signalement annulé');
          }
        },
        {
          text: 'SIGNALER',
          handler: () => {
            console.log('Signalement ok ');
          }
        }
      ]
    });
    alert.present();
  }


}
