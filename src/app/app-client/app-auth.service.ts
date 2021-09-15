import { Injectable } from '@angular/core';
import { AuthService } from '../data/services/AuthService.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../data/models/User.class';
import { AppClientService } from './app-client.service';
import { map, tap } from 'rxjs/operators';

interface UserObject {
  id: string;
  nickname: string;
  isAdmin: boolean;
  email: string;
  firstName?: string;
  lastName?: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppAuthService implements AuthService {
  private readonly BASE_PATH = '/auth';

  private _currentUser: User;
  private readonly userBehaviorSubject = new BehaviorSubject<User>(null);

  readonly $user: Observable<User> = this.userBehaviorSubject;

  get currentUser(): User {
    return this._currentUser;
  }

  constructor(private appClientService: AppClientService) {
    this.getUserFromExistingSession().subscribe((user) =>
      this.setNewUser(user)
    );
  }

  private getUserFromExistingSession(): Observable<User | null> {
    return this.appClientService
      .get<UserObject | null>(`${this.BASE_PATH}/session`)
      .pipe(map((value) => (!!value ? new User(value) : null)));
  }

  registerBasicUser(nickname: string): Observable<User> {
    return this.appClientService
      .put<UserObject>(`${this.BASE_PATH}/register`, {
        nickname,
      })
      .pipe(
        map((value) => new User(value)),
        tap((newUser) => this.setNewUser(newUser))
      );
  }

  clearCurrentUser() {
    this.setNewUser(null);
  }

  private setNewUser(user: User | null) {
    this._currentUser = user;
    this.userBehaviorSubject.next(user);
  }
}
