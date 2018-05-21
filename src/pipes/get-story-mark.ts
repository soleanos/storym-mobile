import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Story } from '../model/Story';
import { User } from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'getStoryMark',
})
export class GetStoryMarkPipe implements PipeTransform {
  auth : User;

  constructor( private authService: AuthService,private userService : UserService,
  ) {}
  
  // /**
  //  * Takes a value and makes it lowercase.
  //  */
  // transform(stories: Story[], ...args) {
    
  //   if(stories.length>0){
  //     for (let story of stories) {
  //       this.authService.getAuth().subscribe(auth=> 
  //       this.userService.getMark(auth.uid,story.id).subscribe(mark => story.mark = mark)
  //     ) 
  //     }
  // }
  // console.log(stories);
  //   return stories;
  // }

  /**
   * Takes a value and makes it lowercase.
   */
  transform(story: Story, ...args) { 
    this.authService.getAuth().subscribe(auth=> 
      this.getMarkAndAddToStory(auth,story)
        // this.userService.getMark(auth.uid,story.id).subscribe(mark => story.mark = mark)
    ) 
    console.log("lol");
    return story;
}

getMarkAndAddToStory(auth: any, story:Story) : Story{
  if(auth){
    this.userService.getMark(auth.uid,story.id).subscribe(mark => story.mark = mark)
  }
  return story;
}

addMarkToStory(mark : any, story:Story) : Story{
  if(mark){
 story.mark = mark
  }
  return story;
}

// getMarkAndAddToStory(auth: any, story:Story) : Story{
//   if(auth){
//     this.userService.getMark(auth.uid,story.id).subscribe(mark => this.addMarkToStory(mark,story))
//   }
//   return story;
// }



  ngOnInit() {
    // this.fillAuth();
  }

  fillAuth (){
    this.authService.getAuth().subscribe(auth=>
      this.auth = auth
    ).unsubscribe
  }
  
  getAuth(): User {
    return this.auth;
  }

}
