import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators,AbstractControl,ValidatorFn} from '@angular/forms'
//import { Address } from '../model/address';
import { Customer } from '../../model/customer';
import { UserService } from '../../services/user/user.service';
import { RouterModule, Routes ,Router} from '@angular/router';
import {Globals} from './../../services/globals'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    userForm: FormGroup;
    customer: Customer= new Customer();
    constructor(
                private fb:FormBuilder, 
                private router: Router, 
                private userService:UserService,
                private globals: Globals
               ){}

    ngOnInit(){
        //alert(11);
        //localStorage.setItem('userData', '');
        this.userForm = this.fb.group({
            email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            password :['',[Validators.required,Validators.maxLength(10)]],
        })
    }
    
    populateData():void{
        this.userForm.patchValue({
            email:'a@a.com'
        })
    }

    // Initicate login
	doLogin(){
        if (this.userForm.invalid === true)
         return;
        this.userService.doLogin().subscribe(data=>
            {
               let userDetails =  data.filter( x => x.email === this.userForm.value.email);
                if(userDetails.length > 0) {
                    if(userDetails[0]['password'] === this.userForm.value.password){
                        this.setRolePermission(userDetails[0]['roleTypeId']);
                        this.success(userDetails);
                    } else {
                        this.success(userDetails);
                    }
                }
            });
    }
    
    setRolePermission(roleTypeId){
        this.userService.getRolePermission().subscribe(data=>
            {
               localStorage.setItem('permissions', JSON.stringify(data[roleTypeId]));  
           });
    }

	// Login success function
	success(data){
		if (data.length > 0) {
            localStorage.setItem('userData', JSON.stringify(data));
            //console.log(data[0]['roleTypeId']);
            this.globals.role = data[0]['roleTypeId'];
            this.router.navigate(['/']);
            alert("Logged In Successfully");
		}else{
            alert("Invalid Credentials");
		}
    }
    
 }

 