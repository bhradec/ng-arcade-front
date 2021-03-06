import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGameAuthorComponent } from './add-game-author/add-game-author.component';
import { AddGameComponent } from './add-game/add-game.component';
import { AdministrationComponent } from './administration/administration.component';
import { EditGameAuthorComponent } from './edit-game-author/edit-game-author.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { GameAuthorProfileComponent } from './game-author-profile/game-author-profile.component';
import { GameLibraryComponent } from './game-library/game-library.component';
import { GameProfileComponent } from './game-profile/game-profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageGameAuthorsComponent } from './manage-game-authors/manage-game-authors.component';
import { ManageGamesComponent } from './manage-games/manage-games.component';
import { RegisterComponent } from './register/register.component';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';
import { AdminGuard } from './shared/other/admin-guard';
import { AuthGuard } from './shared/other/auth-guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "",
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: "", component: GameLibraryComponent, canActivate: [AuthGuard] },
            { path: "userProfile", component: UserProfileComponent, canActivate: [AuthGuard] },
            { path: "gameProfile/:id", component: GameProfileComponent, canActivate: [AuthGuard] },
            { path: "gameAuthorProfile/:id", component: GameAuthorProfileComponent, canActivate: [AuthGuard] },
            { path: "administration", component: AdministrationComponent, canActivate: [AuthGuard, AdminGuard] },
            { path: "manageGames", component: ManageGamesComponent, canActivate: [AuthGuard, AdminGuard] },
            { path: "manageGameAuthors", component: ManageGameAuthorsComponent, canActivate: [AuthGuard, AdminGuard] },
            { path: "addGame", component: AddGameComponent, canActivate: [AuthGuard, AdminGuard] },
            { path: "editGame/:id", component: EditGameComponent, canActivate: [AuthGuard, AdminGuard] },
            { path: "addGameAuthor", component: AddGameAuthorComponent, canActivate: [AuthGuard, AdminGuard] },
            { path: "editGameAuthor/:id", component: EditGameAuthorComponent, canActivate: [AuthGuard, AdminGuard] }
        ]
    },
    {
        path: "routeNotFound", 
        component: RouteNotFoundComponent
    },
    {
        path: "**", 
        redirectTo: "/routeNotFound"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
