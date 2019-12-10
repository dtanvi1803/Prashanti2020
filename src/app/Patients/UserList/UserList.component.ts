import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-UserList',
  templateUrl: './UserList.component.html',
  styleUrls: ['./UserList.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService, 
              private alertify: AlertifyService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
    // this.loadUsers();
  }
  // loadUsers() {
  //   this.userService.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }
}
