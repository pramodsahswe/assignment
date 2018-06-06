import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Broctagon Fintech Group';
  isLoggedIn = 0;

  ngOnInit() { 
    // this.doVerifyLogin();
  }

  doVerifyLogin(){
    if(localStorage.getItem('userData').length >0) {
      this.isLoggedIn = 1;
      let userData = JSON.parse(localStorage.getItem('userData'));
      this.title = 'Welcome '+userData[0].firstName+ " ("+ (userData[0].roleTypeId?'User':'Admin')+")" ;
    } 
    
  }


}
