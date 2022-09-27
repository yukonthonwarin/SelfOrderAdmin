import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.css']
})
export class PrinterComponent implements OnInit {
  currentMenuId: any  = '' ;
  menuList : any = [];
  menuObjList : any = {};
  dataList : any;
  isEdit = false;
  currentRow : any;
  myForm: FormGroup;
  mode:any;
  constructor(private api: ApiserviceService, private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      code_id: [''],
      c_name: ['' , ],
      c_name_en: ['', Validators.required],
      c_desc: ['' , Validators.required],
      c_code: ['' , Validators.required],
      
    });
   }

  ngOnInit(): void {
    this.doGet();
    this.doGetMenu();
  }

  cancel(){
    this.isEdit = false;
  }

  add(){
    this.mode = "เพิ่ม";
    this.isEdit = true;
    let row = {
      code_id: ['0'],
      c_name: ['' ],
      c_name_en: [''],
      c_desc: [''],
      c_code: ['' ],
       
    };
    this.currentRow = row;
    this.myForm.setValue(row);
  }

  edit(row:any){
    this.mode = "แก้ไข";
    this.isEdit = true;
    this.currentRow = row;
    this.myForm.setValue({
      code_id:row.code_id,
      c_name: row.c_name,
      c_name_en: row.c_name_en,
      c_desc: row.c_desc,
      c_code: row.c_group, 
    });

  }

  delete(row:any){
    this.currentRow = row;

    let header = "คุณต้องการลบรายการนี้ใช่หรือไม่";
    let body = row.c_name;
    this.api.confirmSwal(header, body, () => {
      // confirm delete
      let payload = this.currentRow;
      payload.e_status = 'inactive';
      this.save(payload);
    }, () => {

    })
  }

  get myFormControl() {
    return this.myForm.controls;
  }

  
  async doGet(){
    let mDataArray : any  = await this.api.get("printer.list").toPromise(); 
    this.dataList =  mDataArray.c_data;
  }
  async doPost(){

    let payload = this.myForm.value;
    if(this.myForm.valid){ 

      payload.c_media_name = this.currentRow.c_media_name;
      payload.media_id = this.currentRow.media_id;

      if(this.currentRow.code_id!=undefined)
        payload.menu_id = this.currentRow.menu_id;

      console.log(payload); 
      this.save(payload);
      

    } 
  }
  async save(payload:any){
    let result = await this.api.post("printer.save", payload).toPromise();  
      console.log(result);
      if(result.success){
         this.api.showSwal('success', 'Save Complete', '');
         this.cancel();
         this.doGet();
      }
  }

  async doGetMenu(){
    let mDataArray : any  = await this.api.get("printer.list").toPromise(); 
    this.menuList =  mDataArray.c_data;    
    for (const key in this.menuList) {
      const e = this.menuList[key];
      this.menuObjList[e.c_code] = e; 
    }
  }
}
