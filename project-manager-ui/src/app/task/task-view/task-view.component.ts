import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef;
  tasks : Array<any> = [];
  id : number
  task : any = {}
  status: string = "";
  projects : Array<any> = [];
  project : any = {}
  endDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor() { }

  ngOnInit() {
    //this.tasks = [{"parentTask":"Parent task 1","newTask":{"taskName":"Task 1","startDate":"2019-03-18","endDate":"2019-04-18","priority":11}}];
  }

  isEnded(date) {
    if(date <= this.endDate) {
      return true;
    } else {
      return false;
    }
  }

  getProjects() {
    this.projects = [{"title":"Project 1","noTasks":1,"prjStartDate":"2019-03-18","prjEndDate":"2019-04-18","prjPriority":11,
    "tasks" : [{"parentTask":"Parent task 1","newTask":{"taskName":"Task 1","startDate":"2019-03-18","endDate":"2019-04-18","priority":11}}]}];
  }

  selectedProject() {
    this.project = {"title":"Project 1","noTasks":1,"prjStartDate":"2019-03-18","prjEndDate":"2019-04-18","prjPriority":11,
    "tasks" : [{"parentTask":"Parent task 1","newTask":{"taskName":"Task 1","startDate":"2019-03-18","endDate":"2019-04-18","priority":11}}]};
    this.closeModal.nativeElement.click();
  }
}
