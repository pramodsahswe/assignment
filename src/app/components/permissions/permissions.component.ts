import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  permissions: any;

  constructor(private userService:UserService,) { }

  ngOnInit() {
    this.getPermissions();
  }
  getPermissions(){
    this.userService.getRolePermission().subscribe(data=>
      {
        this.permissions = data;
        console.log(this.permissions);
     });
  }

  updatePermission(role_id, event){
    alert("Permssion updated sucessfully.")
    //FYI Call here put method on API to update the permission
    //return this.http.put('/api/users/' + role_id, user, this.jwt()).map((response: Response) => response.json());
  }

}
