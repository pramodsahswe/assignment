/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */

import { Injectable } from '@angular/core';
import{Task} from '../../model/task';
import{Http,Response,RequestOptions,Headers} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/map';
import 'rxjs/add/Operator/catch';
import 'rxjs/add/observable/of';

// import { HttpClient } from '@angular/common/http';

@Injectable(
	{
	providedIn: 'root'
	}
)
export class TaskService { 

	//private _userUrl='https://ngapi4.herokuapp.com/api/getProducts';
	constructor(private _http:Http) { }

	doLogin(data){
		if (data.email == "admin@gmail.com" && data.password == "admin123") {
			return {
				code : 200,
				message : "Login Successful",
				data : data
			};
		}else{
			return {
				code : 503,
				message : "Invalid Credentials",
				data : null
			};
		}
	}

	getTaskList():Observable<Task[]>
	{
		var data=this._http.get('./assets/jsondata/taskdata.json')
		.map((response:Response)=>response ? response.json() : '')
		.catch(this.handleError);
		return data;
		
	}
	private handleError(error:Response)
	{
		return Observable.throw(error.json().error || "Server Error");
	}


	// doRegister(data){
		// 	return this.http.post('user-add.php',data);
	// }
 }



/*
	import{Injectable} from '@angular/core'
	import{User} from '../model/user';
	import{Http,Response,RequestOptions,Headers} from '@angular/http';
	import{Observable} from 'rxjs/Observable';
	import { Subscriber } from 'rxjs/Subscriber';
	import 'rxjs/add/operator/map';
	import 'rxjs/add/Operator/catch';
	import 'rxjs/add/observable/of';
	 
	@Injectable(
	{
	providedIn: 'root'
	}
	)
	 
	export class UserService
	{
	private _userUrl='https://ngapi4.herokuapp.com/api/getProducts';
	constructor(private _http:Http)
	{
	 
	}
	getUserList():Observable<User[]>
	{
	// return this._http.get(this._userUrl)
	// .map((response:Response)=>response ? response.json() : '')
	// .catch(this.handleError);
	// var data= new Observable<User[]>((subscriber: Subscriber<User[]>) => subscriber.next(userData)).map(response=>response).catch(this.handleError);
	var data=this._http.get('./assets/jsondata/userdata.json')
	.map((response:Response)=>response ? response.json() : '')
	.catch(this.handleError);
	return data;
	}
	private handleError(error:Response)
	{
	// console.log("Vasil-ErrorHandle");
	return Observable.throw(error.json().error || "Server Error");
	}

	}

*/	


