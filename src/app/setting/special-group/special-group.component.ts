import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-special-group',
  templateUrl: './special-group.component.html',
  styleUrls: ['./special-group.component.css']
})
export class SpecialGroupComponent implements OnInit {

  dataList : any;
  isEdit = false;
  currentRow : any;
  myForm: FormGroup;
  mode:any;

  constructor(private api: ApiserviceService, private formBuilder: FormBuilder) { 
    this.myForm = this.formBuilder.group({
      lng1_c_name: ['' , Validators.required],
      lng2_c_name: [''],
      c_seq: ['' ],
      specialgroup_id:[''],
      f_price:[''], 
      e_status: ['active' ],  
    });
  }

  ngOnInit(): void {
    this.doGet();
  }

  cancel(){
    this.isEdit = false;
  }

  get myFormControl() {
    return this.myForm.controls;
  }

  async doGet(){
    let mDataArray : any  = await this.api.get("fr.setspecialgroup.list").toPromise(); 
    this.dataList =  mDataArray.c_data;
  }

  async doPost(){

    let payload = this.myForm.value;
    if(this.myForm.valid){ 

      payload.c_media_name = this.currentRow.c_media_name;
      payload.media_id = this.currentRow.media_id;

      if(this.currentRow.menu_id!=undefined)
        payload.menu_id = this.currentRow.menu_id;

      console.log(payload); 
      this.save(payload);
      

    } 
  }

  

  async save(payload:any){
    let result = await this.api.post("fr.setmenu.save", payload).toPromise();  
      console.log(result);
      if(result.success){
         this.api.showSwal('success', 'Save Complete', '');
         this.cancel();
         this.doGet();
      }
  }

}
