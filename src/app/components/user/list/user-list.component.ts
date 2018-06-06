/*
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/

import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import { User } from '../../../model/user';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
 
dataSource = new MatTableDataSource<User>();
displayedColumns = ['userId', 'firstName','lastName','address','phoneNo','email','action'];
 
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
constructor(private _user: UserService) {
 
}
ngOnInit() {
    this._user.getUserList().subscribe(data=>
    {
      this.dataSource = new MatTableDataSource<User>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
}
applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
}
 
}

