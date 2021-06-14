import { EmployeeModule } from './employee.module';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {ApiService} from '../shared/api.service';
@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css']
})
export class EmployeedashboardComponent implements OnInit {

  formValue!: FormGroup;
  employeeModelobj:EmployeeModule = new EmployeeModule();
  employeeData!:any;

  constructor(private FormBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.FormBuilder.group({
      firstname : [''],
      lastname:[''],
      email:[''],
      mobile:['']
    })
    this.getAllemployee();


   // this.fatchDetails()
  }
  // fatchDetails(){
  //   this.api.getemployee().subscribe(res=>{
  //     console.log(res)
  //   })
  // }

  postemployeeDetails(){
    this.employeeModelobj.firstname=this.formValue.value.firstname;
    this.employeeModelobj.lastname=this.formValue.value.lastname;
    this.employeeModelobj.email=this.formValue.value.email;
    this.employeeModelobj.mobile=this.formValue.value.mobile;

    this.api.postemployee(this.employeeModelobj)
    .subscribe(res=>{
      alert("Employee created successfully")
      let ref=document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllemployee();
    },
    error=>{
      alert("Something went wrong");
    })
  }

  getAllemployee(){
    this.api.getemployee()
    .subscribe(res=>{
      this.employeeData=res;
    })
  }


  deleteemployee(row : any){
    this.api.deleteemployee(row.id)
    .subscribe(res=>{
      alert("Delete success")
    })
  }
  onedit(row:any){
    this.employeeModelobj.id=row.id;
    this.formValue.controls['firstname'].setValue(row.firstname)
    this.formValue.controls['lastname'].setValue(row.lastname)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['mobile'].setValue(row.mobile)
  }
  updateemployee(){
    this.employeeModelobj.firstname=this.formValue.value.firstname;
    this.employeeModelobj.lastname=this.formValue.value.lastname;
    this.employeeModelobj.email=this.formValue.value.email;
    this.employeeModelobj.mobile=this.formValue.value.mobile;
    this.api.updateemployee(this.employeeModelobj,this.employeeModelobj.id)
    .subscribe(res=>{
      alert("Update success")
      let ref=document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllemployee();
    })
  }
}
