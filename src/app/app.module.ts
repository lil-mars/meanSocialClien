import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MomentModule } from 'ngx-moment';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { PublicationComponent } from './components/publication/publication.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';
import { MessagesModule } from './messages/messages.module';
import { UserGuard } from './services/user.guard';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        UserEditComponent,
        UserListComponent,
        SidebarComponent,
        TimelineComponent,
        UserProfileComponent,
        UserProfileComponent,
        PublicationComponent,
        FollowingComponent,
        FollowedComponent
    ],
    imports: [
        BrowserModule,
        MessagesModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        MomentModule,
    ],
    providers: [
        UserGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
