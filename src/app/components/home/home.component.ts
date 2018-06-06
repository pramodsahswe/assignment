import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Location} from '@angular/common';
import {Globals} from './../../services/globals'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(location: Location, private globals: Globals) {}
  
  title = 'Broctagon Fintech Group';
  isLoggedIn = 0;

  ngOnInit() { 
     //alert('h');
     this.doVerifyLogin();
     //location.reload();
     // this.globals.role = 'pramod';
  }
  doVerifyLogin(){
   if(localStorage.getItem('userData') !== undefined ){
      if(localStorage.getItem('userData').length >0) {
        this.isLoggedIn = 1;
        let userData = JSON.parse(localStorage.getItem('userData'));
        this.title = 'Welcome '+userData[0].firstName+ " ("+ (userData[0].roleTypeId?'User':'Admin')+")" ;
        this.globals.role = userData[0]['roleTypeId'];
      } 
    } 
    
  }

  logout(){
    this.globals.role = '';
    localStorage.setItem('userData', '');
  }

}

