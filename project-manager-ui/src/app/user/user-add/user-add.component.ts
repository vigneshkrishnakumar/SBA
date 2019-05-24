import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  myForm : FormGroup
  users : Array<any> = [];
  constructor() { }

  ngOnInit() {
    this.users = [{"firstName" : "Vignesh","lastName" : "Krishnakumar", "empId" : 269012},{"firstName" : "User 1","lastName" : "Test", "empId" : 12345}];
    this.myForm = new FormGroup({
      'userGroup': new FormGroup({
          'firstName': new FormControl('', [Validators.required], []),
          'lastName': new FormControl('', Validators.required),
          'empId': new FormControl('', Validators.required)
      })
  })
  }

}
