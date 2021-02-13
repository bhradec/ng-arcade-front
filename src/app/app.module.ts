import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { GameProfileComponent } from './game-profile/game-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GameAuthorProfileComponent } from './game-author-profile/game-author-profile.component';
import { GameLibraryComponent } from './game-library/game-library.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './shared/other/auth-guard';
import { AdminGuard } from './shared/other/admin-guard';
import { LogoComponent } from './logo/logo.component';
import { SecondaryNavigationComponent } from './secondary-navigation/secondary-navigation.component';
import { GameTileComponent } from './game-tile/game-tile.component';
import { AdministrationComponent } from './administration/administration.component';
import { AddGameComponent } from './add-game/add-game.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { AddGameAuthorComponent } from './add-game-author/add-game-author.component';
import { EditGameAuthorComponent } from './edit-game-author/edit-game-author.component';
import { ManageGamesComponent } from './manage-games/manage-games.component';
import { ManageGameAuthorsComponent } from './manage-game-authors/manage-game-authors.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        GameProfileComponent,
        UserProfileComponent,
        GameAuthorProfileComponent,
        GameLibraryComponent,
        MainNavigationComponent,
        LogoComponent,
        SecondaryNavigationComponent,
        GameTileComponent,
        AdministrationComponent,
        AddGameComponent,
        EditGameComponent,
        AddGameAuthorComponent,
        EditGameAuthorComponent,
        ManageGamesComponent,
        ManageGameAuthorsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [AuthGuard, AdminGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
