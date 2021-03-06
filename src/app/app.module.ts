import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UtilsProvider } from '../providers/utils/utils';
import { ForgetPage } from '../pages/forget/forget';
import { MessageService } from '../services/message.service';
import { SliceService} from '../services/slice.service';
import { StoryService} from '../services/story.service';
import { CategoryService} from '../services/category.service';
import { UserService } from '../services/user.service';
import { AuthService} from '../services/auth.service';

import { ReadPage } from '../pages/read/read';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { GetStoryMarkPipe } from '../pipes/get-story-mark';

// import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ForgetPage,
    ReadPage,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ForgetPage,
    ReadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFirestoreModule,
    UtilsProvider,
    StoryService,
    MessageService,
    SliceService,
    CategoryService,
    UserService,
    AuthService,
    GetStoryMarkPipe
  ]
})
export class AppModule { }
