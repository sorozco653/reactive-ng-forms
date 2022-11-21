import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user$

  constructor(private userService: UserService){
    this.user$ = this.userService.getUser()
  }

  ngOnInit(): void {
      console.log('getting user?', this.user$)
  }

}
