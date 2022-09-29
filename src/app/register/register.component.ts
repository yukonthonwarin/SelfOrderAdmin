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

   
  constructor(private router: Router, private api: ApiserviceService, private formBuilder: FormBuilder) {

    this.myForm = this.formBuilder.group({
      company_c_name: ['' , Validators.required],
      company_c_contact: ['', Validators.required],
      company_c_contact_phone_no: ['', Validators.required],
      company_c_contact_email: [''],
      company_template_id: ['', Validators.required], 
      company_province_id: [''],
      company_district_id: [''], 
    });
 

  }

  ngOnInit(): void {
    this.doGet();
    this.doGetProvince()
  }

  get myFormControl() {
    return this.myForm.controls;
  }

  view(company_template_id:any){
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
  }

  cancel(){
    this.isEdit = false;
  }

  async doGet(){
    let mDataArray : any  = await this.api.get("restaurant.template").toPromise(); 
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

      let result = await this.api.post("company.register", payload).toPromise();  
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


