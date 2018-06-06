import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, RouterModule, Routes ,Router, Params} from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators,AbstractControl,ValidatorFn} from '@angular/forms'
import { Customer } from '../../../model/customer';
import { TaskService } from '../../../services/task/task.service';
import { Task } from '../../../model/task';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit  {
    userForm: FormGroup;
    //customer: Customer= new Customer();
    task =  new Task(0,0,"","","","");

    headtitle:string  ="Create"
    prioritylist = [ {id:1, priority:"Low" },
                     {id:2,priority:"Medium"},
                     {id:3,priority:"High"},
                     {id:4,priority:"Need Trainge"},
                     {id:5,priority:"Normal"},
                   ];

    statuslist = [{id:1,status:"Open"},
                  {id:2,status:"Close"},
                  {id:2,status:"Reopen"},
                  {id:3,status:"Completed"},
                  {id:4,status:"In Progress"},
                 ];
   
    submitDisabled=false;

    constructor(private fb:FormBuilder, 
                private _task: TaskService, 
                private activatedRoute: ActivatedRoute,
                private router: Router, 
             ){}
    ngOnInit(): void{
        this.userForm = this.fb.group({
            taskTitle:['',[Validators.required,Validators.minLength(2)]],
            taskSummary :['',[Validators.required,Validators.maxLength(100)]],
            taskpriority :['',[Validators.required]],
            statuslist :['',[Validators.required]],
        })

        // subscribe to router event
      this.activatedRoute.params.subscribe((params: Params) => {
        let taskId = params['taskId'];
        this.taskDetails(taskId);
       });


    }

    setNotification(notifyVia:string):void{
        const phoneControl = this.userForm.get('phone');
        if(notifyVia === "text"){
            phoneControl.setValidators(Validators.required)
        }else{
            phoneControl.clearValidators()
        }
            phoneControl.updateValueAndValidity()
    }

    populateData():void{
        this.userForm.patchValue({
            email:'a@a.com'
        })
    }

    save() {
        if(this.userForm.invalid === true)
        return;
        alert("Success! task created successfully.");
        //Forms data is available in this.userForm control and it will be send to server for crud operation  
        //console.log(this.userForm.invalid);
        this.router.navigate(['task/list']);
        console.log('Saved: ' + JSON.stringify(this.userForm.value));
        /**
        public addTask(data: any): any {
            //get form data
            return this.apiService.makeReq('addTasks', { method: 'Post', body: data });
        }
        public editTask(data: any, urlData?: any): any {
         //get form data
         return this.apiService.makeReq('updateTasks', { method: 'Post', body: data, urlData: urlData });
        }
        getTasks(): any {
            //get form data
            return this.apiService.makeReq('getTasks');
        }
        public getTaskDetails(urlData: any): any {
            //get form data
            return this.apiService.makeReq('userDetail', { urlData: urlData });
        }
        */
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


