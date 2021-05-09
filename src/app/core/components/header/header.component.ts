import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser$: Observable<User>;
    

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentUser$ = this.userService.getUser();
  }
}
