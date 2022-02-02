import { User } from './model/user';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-firebase';

  items$: Observable<any> = this.userService.allUsers$
  newUser: User = new User()

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  onCreate(user: User): void {
    this.userService.create(user).then(
      resp => alert(`${user} has been added`), //promise lekezelése
      err => alert(err.error)
    )
  }

  onUpdate(user: User): void {
    this.userService.update(user).then(
      resp => alert(`${user} has been updated`),
      err => alert(err.error)
    )
  }

  onDelete(user: User): void {
    if (!confirm('Are you sure?')) { return } //confirm ablakkal könnyen megvalósítható a biztonsági kérdés
    this.userService.delete(user).then(
      resp => alert(`${user} has been deleted`),
      err => alert(err.error)
    )
  }

}
