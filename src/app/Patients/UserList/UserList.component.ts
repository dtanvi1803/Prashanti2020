import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/pagination';

@Component({
  selector: 'app-UserList',
  templateUrl: './UserList.component.html',
  styleUrls: ['./UserList.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  userParams: any = {};
  pagination: Pagination;
  constructor(private userService: UserService, 
              private alertify: AlertifyService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.userParams.city = this.user.city;
    this.userParams.clinicId = this.user.clinicID;
    this.userParams.orderBy = 'lastActive';
  }
  resetFilters() {
    this.userParams.city = this.user.city;
    this.userParams.clinicId = this.user.clinicID;
    this.loadUsers();
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
        }, error => {
      this.alertify.error(error);
      });
  }
}
