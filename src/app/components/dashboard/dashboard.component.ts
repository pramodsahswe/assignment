import { Component, OnInit } from '@angular/core';
import {Globals} from './../../services/globals'
import { TaskService } from '../../services/task/task.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Doughnut
  public doughnutChartLabels:string[] = ['1', '2', '3'];
  public doughnutChartData:number[] = [8, 2, 3]
  public doughnutChartType:string = 'doughnut';


  constructor(private globals: Globals, private _task: TaskService) { }
  
  // ADD CHART OPTIONS.
  pieChartOptions = {
  responsive: true
  }
   
  pieChartLabels = []; //['JAN', 'FEB', 'MAR', 'APR', 'MAY'];
  // CHART COLOR.
  pieChartColor:any = [
  {
  backgroundColor: ['rgba(30, 169, 224, 0.8)',
  'rgba(255,165,0,0.9)',
  'rgba(139, 136, 136, 0.9)',
  'rgba(255, 161, 181, 0.9)',
  'rgba(255, 102, 0, 0.9)'
  ] } ]
   
  pieChartData:any = [{ data: [] } ];

  ngOnInit() {

    // For Doughnut Chart
    this._task.getTaskList().subscribe(resdata=>
      {
        let tasks = this.getUserTasks(resdata);
        let usrArray = [];
        let taskArray = [];
        for (let usr in tasks) {
          this.doughnutChartLabels.push(usr);
          this.doughnutChartData.push(tasks[usr].length);
        }
      });

    // for Pie Chart
      this._task.getTaskList().subscribe(data=>
        {
          var totalUserIds = [];
          data.forEach(function(team){
              totalUserIds.push(team.userId.toString());
          });
          var chartData=[];
          totalUserIds.forEach(value=>  {
            var count = 0;
            var isLableExist=false;

          totalUserIds.forEach(equalValue=> {
          if(value === equalValue) {
              count++;
          }
          })
          this.pieChartLabels.forEach(checkValue => {
          if(checkValue.toString() === value.toString())
              isLableExist = true;
          });
          if(isLableExist === false) {
             chartData.push(count);
            this.pieChartLabels.push(value);
          }
          });
            this.pieChartData = chartData as any [];
        });
  }

  getUserTasks(data){
      var array = data,
      groups = Object.create(null),
      grouped = [];
      
      array.forEach(function (o) {
          if (!groups[o.userId]) {
              groups[o.userId] = [];
              grouped.push({ group: o.userId, color: groups[o.userId] });
          }
          groups[o.userId].push(o.id);
      });
      return groups;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  onChartClick(event) {
    console.log(event);
  }


}
