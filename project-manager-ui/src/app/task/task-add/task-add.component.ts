import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  @ViewChild('closeProjectModal') closeProjectModal: ElementRef;
  @ViewChild('closeUserModal') closeUserModal: ElementRef;
  @ViewChild('closeParentModal') closeParentModal: ElementRef;
  myForm : FormGroup
  status : string = ""
  task : {}
  enableParent : boolean = false;
  projects : Array<any> = [];
  project : any = {}
  users : Array<any> = [];
  user : any = {}
  parents : Array<any> = [];
  parent : any = {}
  constructor() { }

  ngOnInit() {
    this.myForm = new FormGroup({
      'taskGroup': new FormGroup({
          'project': new FormControl('', Validators.required),
          'taskName': new FormControl('', [Validators.required], []),
          'priority': new FormControl('', Validators.required),
          'parentTask': new FormControl('', Validators.required),
          'startDate': new FormControl('', Validators.required),
          'endDate': new FormControl('', Validators.required),
          'user': new FormControl('', Validators.required),
          'parentCheck': new FormControl('', Validators.required)
      })
  })
  console.log(this.enableParent);
  this.myForm.controls['taskGroup']['controls'].startDate.setValue(this.currentDate());
  this.myForm.controls['taskGroup']['controls'].endDate.setValue(this.endDate());
  this.myForm.statusChanges.subscribe((enableParent:any) => console.log(enableParent));
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

  handleChange(value: boolean) {
    console.log('value '+value);
    if(value) {
        this.myForm.controls['taskGroup']['controls'].project.disable();
        this.myForm.controls['taskGroup']['controls'].taskName.disable();
        this.myForm.controls['taskGroup']['controls'].priority.disable();
        this.myForm.controls['taskGroup']['controls'].startDate.disable();
        this.myForm.controls['taskGroup']['controls'].endDate.disable();
    } else {
        this.myForm.controls['taskGroup']['controls'].project.enable();
        this.myForm.controls['taskGroup']['controls'].taskName.enable();
        this.myForm.controls['taskGroup']['controls'].priority.enable();
        this.myForm.controls['taskGroup']['controls'].startDate.enable();
        this.myForm.controls['taskGroup']['controls'].endDate.enable();
    }
  }
  resetForm() {
    this.myForm.reset();
  }

  getProjects() {
    this.projects = [{"title":"Project 1","noTasks":1,"prjStartDate":"2019-03-18","prjEndDate":"2019-04-18","prjPriority":11,
    "tasks" : [{"parentTask":"Parent task 1","newTask":{"taskName":"Task 1","startDate":"2019-03-18","endDate":"2019-04-18","priority":11}}]}];
  }

  selectedProject() {
    this.project = {"title":"Project 1","noTasks":1,"prjStartDate":"2019-03-18","prjEndDate":"2019-04-18","prjPriority":11,
    "tasks" : [{"parentTask":"Parent task 1","newTask":{"taskName":"Task 1","startDate":"2019-03-18","endDate":"2019-04-18","priority":11}}]};
    this.closeProjectModal.nativeElement.click();
  }

  getUsers() {
    this.users = [{"firstName" : "Vignesh","lastName" : "Krishnakumar", "empId" : 269012},{"firstName" : "User 1","lastName" : "Test", "empId" : 12345}];
  }
  
  selectedUser() {
    this.user = {"firstName" : "Vignesh","lastName" : "Krishnakumar", "empId" : 269012};
    this.closeUserModal.nativeElement.click();
  }

  getParentTasks() {
    this.parents = [{"parentTask":"Parent task 1","newTask":{"taskName":"Task 1","startDate":"2019-03-18","endDate":"2019-04-18","priority":11}}];
  }
  
  selectedParentTask() {
    this.parent = {"parentTask":"Parent task 1","newTask":{"taskName":"Task 1","startDate":"2019-03-18","endDate":"2019-04-18","priority":11}};
    this.closeParentModal.nativeElement.click();
  }
}
