import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-UserCard',
  templateUrl: './UserCard.component.html',
  styleUrls: ['./UserCard.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
