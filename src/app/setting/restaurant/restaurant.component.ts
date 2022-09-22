import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import { ApiserviceService } from 'src/app/apiservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  lng1_c_name : any ;
 
  constructor(private router: Router, private api: ApiserviceService) { }

  ngOnInit(): void {
  }
  
 

}
