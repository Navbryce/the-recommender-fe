import { User } from '../models/User.class';
import { Observable } from 'rxjs';

export interface AuthService {
  readonly currentUser: Observable<User | null>;

  registerBasicUser(nickname: string): Observable<User>;
  clearCurrentUser(): void;
}
