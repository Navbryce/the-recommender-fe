export enum UserType {
  BASIC_USER = 'BASIC_USER',
  FULL_USER = 'FULL_USER',
}

export class User {
  readonly id: string;
  readonly nickname: string;
  readonly isAdmin: boolean;
  readonly email?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly type: string;

  constructor(inputObject: {
    id: string;
    nickname: string;
    isAdmin: boolean;
    email: string;
    firstName?: string;
    lastName?: string;
    type: string;
  }) {
    Object.assign(this, inputObject);
  }

  get isFullUser(): boolean {
    return this.email === null;
  }
}
