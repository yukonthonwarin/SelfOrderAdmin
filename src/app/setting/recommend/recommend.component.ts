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

  currentRow : any;
  isEdit = false;
  dataList : any;
  myForm: FormGroup;
  mode:any;
  constructor(private api: ApiserviceService, private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      lng1_c_name: ['' , Validators.required],
      lng2_c_name: [''],
      c_seq: ['' ], 
      e_status: ['active' ], 
      f_price :  [0 , Validators.required],
      
      menu_id: ['', Validators.required ],  
      
    });
   }
  
  ngOnInit(): void {
    this.doGet();
    this.doGetItem();
    
  }

  async doGet(){ 
    let _w = "";
    if(this.currentMenuId!=undefined && this.currentMenuId!=""){
      _w = "?item_id="+this.currentMenuId;
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
    let mDataArray : any  = await this.api.get("fr.setmenu.list").toPromise(); 
    this.menuList =  mDataArray.c_data;    
    for (const key in this.menuList) {
      const e = this.menuList[key];
      this.menuObjList[e.menu_id] = e; 
    }
  }
  
  
  async doPost(){

    let payload = this.myForm.value;
    if(this.myForm.valid){ 

      payload.c_media_name = this.currentRow.c_media_name;
      payload.media_id = this.currentRow.media_id;

      if(this.currentRow.item_id!=undefined)
        payload.item_id = this.currentRow.item_id;

      console.log(payload); 
      this.save(payload); 
    } 
  }

  async save(payload:any){
    let result = await this.api.post("fr.setitem.save", payload).toPromise();  
      console.log(result);
      if(result.success){
         this.api.showSwal('success', 'Save Complete', '');
         this.cancel();
         this.doGet();
      }
  }

  cancel(){
    this.isEdit = false;
  }

  add(){
    this.mode = "เพิ่ม";
    this.isEdit = true;
    let row = {
      lng1_c_name: '',
      lng2_c_name: '',
      c_seq: '0',
      e_status: 'active', 
      f_price : 0,
      uofm_id : '0',
      menu_id : this.menuList[0].menu_id,
      printer_id : '0',
    };
    this.currentRow = row;
    this.myForm.setValue(row); 
  }
}
