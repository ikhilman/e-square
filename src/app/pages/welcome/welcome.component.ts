import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user'
import { UserService } from '../../services/user.service'


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  userNameFormControl: FormControl;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setUserNameFormControl();
  }

  setUserNameFormControl(): void {
    this.userNameFormControl = new FormControl('', [Validators.required]);
  }

  onSubmit(): void {
    if (this.userNameFormControl.valid) {
      const user: User = {
        userName: this.userNameFormControl.value
      }
      this.userService.setUser(user);
      this.router.navigate(['search']);
    }
  }
}
