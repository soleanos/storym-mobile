import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Story } from '../model/Story';

@Pipe({
  name: 'getStoryMark',
})
export class GetStoryMarkPipe implements PipeTransform {
  auth : any;

  constructor( private authService: AuthService,private userService : UserService,
  ) {

  }
  
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
    this.userService.getMark(auth.uid,story.id).subscribe(mark => story.mark = mark)
  ) 
  return story;
}

  // console.log(auth.uid+' ' + story.id)

  ngOnInit() {
    this.fillAuth();
  }

  fillAuth (){
    this.authService.getAuth().subscribe(auth=>
      this.auth = auth
    )
  }


}
