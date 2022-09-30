import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiserviceService } from 'src/app/apiservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  templateList : any = [];
  provinceList: any= [];;
  districtList: any= [];;
  tambonList: any= [];;
 
  isEdit : any = false;
  currentTemplate : any;
  currentMenuId : any;
  setitem : any = [];

   
  constructor(private router: Router, private api: ApiserviceService, private formBuilder: FormBuilder) {

    this.myForm = this.formBuilder.group({
      lng1_c_name: ['' , Validators.required],
      c_contact: ['', Validators.required],
      c_contact_phone_no: ['', Validators.required],
      c_contact_email: [''],
      company_template_id: ['', Validators.required], 
      company_province_id: [''],
      company_district_id: [''], 
    });
  
 
    this.doGet();
    this.doGetProvince()
  }

  ngOnInit(): void {
    
  }

  get myFormControl() {
    return this.myForm.controls;
  }

  selectMenu(){
    console.log(this.currentMenuId );
    this.setitem = [];
    if(this.currentMenuId==''){
      this.setitem = this.currentTemplate.setitem;
      return;
    }
    for (const key in this.currentTemplate.setitem) {
      const element = this.currentTemplate.setitem[key];
      if(element.menu_id==this.currentMenuId){
        this.setitem.push(element);
      }
    }
  }

  view(company_template_id:any){
    this.currentMenuId = '';
    this.setitem = [];
    console.log(company_template_id)
    if(company_template_id==null || company_template_id==undefined || company_template_id=='') return;
    this.isEdit = true;
    for (const key in this.templateList) {
      const element = this.templateList[key];
      if(element.company_template_id==company_template_id){
        this.currentTemplate = element;
      }
    }
    console.log(this.currentTemplate)
    this.setitem = this.currentTemplate.setitem;
  }

  cancel(){
    this.isEdit = false;
  }

  async doGet(){
    let mDataArray : any  = await this.api.getRestaurantTemplate().toPromise(); 
    this.templateList =  mDataArray.c_data;
  }

  async doGetProvince(){
    let mDataArray : any  = await this.api.get("province.list").toPromise(); 
    this.provinceList =  mDataArray.c_data;
  }

  async doGetDistrict(event:any){  
    let mDataArray : any  = await this.api.get("district.list?province_id="+event.target.value).toPromise(); 
    this.districtList =  mDataArray.c_data;
  }

  async doGeTambon(event:any){
    let mDataArray : any  = await this.api.get("tambon.list?district_id="+event.target.value).toPromise(); 
    this.tambonList =  mDataArray.c_data;
  }

 
  async doPost(){
    let payload = this.myForm.value;
    if(this.myForm.valid){ 
      console.log(payload); 

      // POST /restaurant.register
      let result = await this.api.createRestaurant(payload).toPromise();  
      if(result.success){ 

        Swal.fire({
          title: "ลงทะเบียนเรียบร้อย", 
          text : '',
          showCancelButton: false,
          confirmButtonText: 'ตกลง',  
          confirmButtonColor : '#1ab394'
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.router.navigate(['/login']); 
          }  

        })

        
     }

    }
  }

}
