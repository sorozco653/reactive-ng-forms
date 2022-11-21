import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Profile {
  name: string
  email: string
  password: string // this would be hash
  dob: string // Would use Date typing
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$: BehaviorSubject<Profile| null> = new BehaviorSubject<Profile | null>(null)
  constructor() { }

  getUser(): Observable<Profile| null> {
    return this.user$.asObservable();
}

  setUser(user: Profile) {
      this.user$.next(user);
  }
}
