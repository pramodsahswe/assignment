import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes ,Router, Params} from '@angular/router';
import { TaskService } from '../../../services/task/task.service';
import { Task } from '../../../model/task';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  
  priorityList = [{id:1,priority:"Low"},{id:2,priority:"Medium"},{id:3,priority:"High"}];
  statusList =[{id:1,status:"Open"},{id:2,status:"Close"},{id:2,status:"Reopen"}];
  task =  new Task(0, 0, "", "", "", "");
  submitDisabled=false;
  
  constructor(private router: Router, 
              private activatedRoute: ActivatedRoute, 
              private _task: TaskService
            ) { }

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      let taskId = params['taskId'];
      this.taskDetails(taskId);
     });
  }

  taskDetails(taskId){
    this._task.getTaskList().subscribe(resdata=>
      {
        let task = this.getUserTasks(resdata, taskId);
        this.task.id = task['id'];
        this.task.userId = task['userId'];
        this.task.summary = task['summary'];
        this.task.description = task['description'];
        this.task.priorityId = task['priorityId'];
        this.task.statusId = task['statusId'];
      });
  }


  getUserTasks(data,taskId){
  let array = [];
   data.forEach(function (dt) {
     if(dt['id'] ==taskId ) {
      array = dt;
      }
   });
   return array;
  }

  goBack(){
    this.router.navigate(['task/list']);
  }
}
