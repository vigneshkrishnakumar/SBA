import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {

  @ViewChild('closeUserModal') closeUserModal: ElementRef;
  myForm : FormGroup
  projects : Array<any> = [];
  users : Array<any> = [];
  user : any = {}
  enableDate : boolean = false;
  constructor() { }

  ngOnInit() {
    this.myForm = new FormGroup({
      'projectGroup': new FormGroup({
          'project': new FormControl('', [Validators.required], []),
          'priority': new FormControl('', Validators.required),
          'user': new FormControl('', Validators.required),
          'startDate': new FormControl('', Validators.required),
          'endDate': new FormControl('', Validators.required)
      })
  })
  this.myForm.controls['projectGroup']['controls'].startDate.setValue(this.currentDate());
  this.myForm.controls['projectGroup']['controls'].endDate.setValue(this.endDate());
    this.projects = [{"title":"Project 1","noTasks":1,"prjStartDate":"2019-03-18","prjEndDate":"2019-04-18","prjPriority":11,
    "tasks" : [{"parentTask":"Parent task 1","newTask":{"taskName":"Task 1","startDate":"2019-03-18","endDate":"2019-04-18","priority":11}}]}];
  }
  
  currentDate() {
    const currentDate = new Date();
    console.log(currentDate.getDate() + 1);
    return currentDate.toISOString().substring(0,10);
  }
  endDate() {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    console.log(currentDate.getDate());
    return currentDate.toISOString().substring(0,10);
  }

  getUsers() {
    this.users = [{"firstName" : "Vignesh","lastName" : "Krishnakumar", "empId" : 269012},{"firstName" : "User 1","lastName" : "Test", "empId" : 12345}];
  }
  
  selectedUser() {
    this.user = {"firstName" : "Vignesh","lastName" : "Krishnakumar", "empId" : 269012};
    this.closeUserModal.nativeElement.click();
  }
}
