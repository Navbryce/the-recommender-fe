import { User } from '../models/User.class';
import { Observable } from 'rxjs';

export interface AuthService {
  readonly $user: Observable<User>;
  readonly currentUser: User | null;

  registerBasicUser(nickname: string): Observable<User>;
  clearCurrentUser(): void;
}
