import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  c_username : string = 'user@1002';
  c_password : string = 'fr-123456';
  restaurantInfo : any;
  constructor(private router: Router, private api: ApiserviceService) { 
 
  }

  ngOnInit(): void { 
    this.getRestaurantInfo();
  }

  async login(){ 
    let result = await this.api.login(this.c_username, this.c_password).toPromise();  
    console.log(result);
    if(result.success){
      localStorage.token = result.token;
      localStorage.uuid = result.uuid;
      localStorage.user = JSON.stringify(result.info);
      this.router.navigate(['/dashboard']);
    }
  }
  async getRestaurantInfo() { 
    let mDataArray : any  = await this.api.getRestaurantInfo().toPromise(); 
    this.restaurantInfo =  mDataArray.c_data;

    localStorage.setItem("restaurantInfo", JSON.stringify(this.restaurantInfo));
 
  }  
  
}
