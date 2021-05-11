import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser$ = this.userService.getUser();
  }

  toWishList() {
    this.router.navigate(['wish-list'])
  }
}
