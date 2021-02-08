import { Injectable } from '@angular/core';
import { DataService } from './data.service';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private dataService: DataService) { }

    getUsers() {
        return this.dataService.getUsers();
    }

    getUser(id) {
        return this.dataService.getUser(id);
    }

    addUser(user) {
        return this.dataService.addUser(user);
    }

    editUser(user) {
        return this.dataService.editUser(user);
    }

    deleteUser(id) {
        return this.dataService.deleteUser(id);
    }
}
