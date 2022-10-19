import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {
  currentMenuId: any  = '' ;
  itemList : any = [];
  itemObjList : any = {};

  menuList : any = [];
  menuObjList : any = {};

  dataList : any;
  myForm: FormGroup;

  constructor(private api: ApiserviceService, private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      lng1_c_name: ['' , Validators.required],
      lng2_c_name: [''],
      item_id: ['' , Validators.required ], 
      e_status: ['active' ], 
      f_price :  [0 , Validators.required],
      menu_id: [''],
      
      
    });
   }
  
  ngOnInit(): void {
    this.doGet();
    this.doGetItem();
    this.doGetMenu();
  }

  async doGet(){ 
    let _w = "";
    if(this.currentMenuId!=undefined && this.currentMenuId!=""){
      _w = "?menu_id="+this.currentMenuId;
    }
    let mDataArray : any  = await this.api.get("fr.setrecommend.list"+_w).toPromise(); 
    this.dataList =  mDataArray.c_data;
  }

  async doGetItem(){
    let mDataArray : any  = await this.api.get("fr.setitem.list").toPromise(); 
    this.itemList =  mDataArray.c_data;    
    for (const key in this.itemList) {
      const e = this.itemList[key];
      this.itemObjList[e.item_id] = e; 
    }
  }
  async doGetMenu(){
    let mDataArray : any  = await this.api.get("fr.setitem.list").toPromise(); 
    this.menuList =  mDataArray.c_data;    
    for (const key in this.menuList) {
      const e = this.menuList[key];
      this.menuObjList[e.menu_id] = e; 
    }
  }
  
}
