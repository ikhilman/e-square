import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user'
import { StorageKeys } from '../models/storageKeys'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user$ = new BehaviorSubject<User>(null);


  constructor() {
    const currentUser = this.getCurrentUser();
    currentUser && this._user$.next(currentUser);
  }

  getUser(): Observable<User> {
    return this._user$.asObservable();
  }

  setUser(user: User): void {
    localStorage.setItem(StorageKeys.CurrentUser, JSON.stringify(user));
    this._user$.next(user);
  }

  private getCurrentUser(): User {
    const userStorage = localStorage.getItem(StorageKeys.CurrentUser)
    let currentUser: User = null;
    if (userStorage) {
      currentUser = JSON.parse(userStorage);
    }
    return currentUser;
  }
}
