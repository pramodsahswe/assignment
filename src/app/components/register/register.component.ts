import { Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators,AbstractControl,ValidatorFn} from '@angular/forms'
//import { Address } from '../model/address';
import { Customer } from '../../model/customer';

function ratingRange(min:number, max:number): ValidatorFn{
    return (c: AbstractControl):{[key:string]:boolean}|null => {
        if(c.value != undefined && (isNaN(c.value)|| c.value<min || c.value>max)){
            return {'range':true}
        };
        return null
    }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit  {
    userForm: FormGroup;
    customer: Customer= new Customer();

    constructor(private fb:FormBuilder){}

    ngOnInit(): void{
        this.userForm = this.fb.group({
            firstName:['',[Validators.required,Validators.minLength(5)]],
            lastName :['',[Validators.required,Validators.maxLength(10)]],
            email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            city :['',[Validators.maxLength(10)]],
            address :['',[Validators.required,Validators.maxLength(10)]],
            phone :['',[Validators.required,Validators.maxLength(10)]],
            password :['',[Validators.required,Validators.maxLength(10)]],
            confirmPassword :['',[Validators.required,Validators.maxLength(10)]],
        })

        
        // this.customerForm.get('notification').valueChanges
        //                .subscribe((value)=> this.setNotification(value))
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

    /*populateData():void{
        this.customerForm.setValue({
            firstName:'john',
            lastName:'mehtwe',
            email:'a@a.com'
        })
    }*/
    save() {
        alert("Success! You have registered successfully.");
        console.log(this.userForm);
        console.log('Saved: ' + JSON.stringify(this.userForm.value));

    }

    

    

 }
