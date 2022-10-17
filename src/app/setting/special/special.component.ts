import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {
  currentspecialgroupId: any  = '' ;
  specialgroupList : any = [];
  specialgroupObjList : any = {};

  dataList : any;
  isEdit = false;
  currentRow : any;
  myForm: FormGroup;
  mode:any;

  constructor(private api: ApiserviceService, private formBuilder: FormBuilder) { 
    this.myForm = this.formBuilder.group({
      lng1_c_name: ['' , Validators.required],
      
      c_seq: ['' ],
      specialgroup_id:['', Validators.required],
      f_price :  [0 , Validators.required],
      e_status: ['active' ],  
    });
  }
  async doGetMenu(){
    let mDataArray : any  = await this.api.get("fr.setspecialgroup.list").toPromise(); 
    this.specialgroupList =  mDataArray.c_data;    
    for (const key in this.specialgroupList) {
      const e = this.specialgroupList[key];
      this.specialgroupObjList[e.specialgroup_id] = e; 
    }
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
      lng1_c_name: '',
      
      c_seq: '0',
      e_status: 'active', 
      f_price : 0,
      
      specialgroup_id : this.specialgroupList[0].specialgroup_id,
      
    };
    this.currentRow = row;
    this.myForm.setValue(row); 
  }

  edit(row:any){
    this.mode = "แก้ไข";
    this.isEdit = true;
    this.currentRow = row;
    this.myForm.setValue({
      lng1_c_name: row.lng1_c_name,
      c_seq: row.c_seq,
      e_status: row.e_status, 
      f_price: row.f_price*1, 
      specialgroup_id: row.specialgroup_id, 
      
      
      
      
    });

  }

  delete(row:any){
    this.currentRow = row; 
    let header = "คุณต้องการลบรายการนี้ใช่หรือไม่";
    let body = row.lng1_c_name;
    this.api.confirmSwal(header, body, () => {
      // confirm delete
      // let payload = this.currentRow;
      // payload.e_status = 'inactive';
      let payload = {
        item_id : this.currentRow.item_id,
        e_status : 'inactive'
      }
      this.save(payload);
    }, () => {

    })
  }

  get myFormControl() {
    return this.myForm.controls;
  }

  async doGet(){ 
    let _w = "";
    if(this.currentspecialgroupId!=undefined && this.currentspecialgroupId!=""){
      _w = "?specialgroup_id="+this.currentspecialgroupId;
    }
    let mDataArray : any  = await this.api.get("fr.setspecial.list"+_w).toPromise(); 
    this.dataList =  mDataArray.c_data;
  }

  async doPost(){

    let payload = this.myForm.value;
    if(this.myForm.valid){ 

      payload.c_media_name = this.currentRow.c_media_name;
      payload.media_id = this.currentRow.media_id;

      if(this.currentRow.menu_id!=undefined)
        payload.specialgroup_id = this.currentRow.specialgroup_id;

      console.log(payload); 
      this.save(payload);
      

    } 
  }

  async save(payload:any){
    let result = await this.api.post("fr.setspecial.save", payload).toPromise();  
      console.log(result);
      if(result.success){
         this.api.showSwal('success', 'Save Complete', '');
         this.cancel();
         this.doGet();
      }
  }

}
