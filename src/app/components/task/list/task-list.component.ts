import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { RouterModule, Routes ,Router} from '@angular/router';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import { Task } from '../../../model/task';
import {SelectionModel} from '@angular/cdk/collections';
import { DOCUMENT } from '@angular/platform-browser';
import {Globals} from './../../../services/globals'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
  domain: any;
  permissions: any;
  resData : any;
  dataSource = new MatTableDataSource<Task>();
  displayedColumns = ['chk','id', 'userId','summary','description','priorityId','statusId','action'];
  selection = new SelectionModel<Task>(true, []);
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _task: TaskService, 
          @Inject(DOCUMENT) private document: any,
          private router: Router, 
          private globals: Globals
        ) {}

  ngOnInit() {
      this._task.getTaskList().subscribe(data=>
      {
        // If user is admin display all data else display logged in user data for other role
        if(this.globals.role == '0') {
          this.resData =  data;
        } else {
          let userID = this.getUserId();
          this.resData =  data.filter( x => x.userId === userID);
        }
        this.dataSource = new MatTableDataSource<Task>(this.resData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
      this.checkPermissions();
  }
  
  applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }
  deleteAllTasks() {
    //alert('h');
  }

  deleteTask(row) {
    let taskId = row.id;
    if(confirm("Are you sure to delete "+row.summary)) {
      alert("Record has been deleted successfully");
    }
    //return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }
 
  viewTask(taskId) {
    this.router.navigate(['task/detail/'+taskId]);
  }

  editTask(taskId) {
    this.router.navigate(['task/add/'+taskId]);
  }

  checkPermissions(){
    this.checkPermissions = JSON.parse(localStorage.getItem('permissions'));
  }
  //Get logged in user id
  getUserId(){
    let userData = JSON.parse(localStorage.getItem('userData'));
    return userData[0]['userId'];
  }
  
 
}

