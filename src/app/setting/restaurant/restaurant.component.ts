import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiserviceService } from 'src/app/apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  lng1_c_name : any ;
  restaurantInfo : any;
  myForm: FormGroup;
  
 
  constructor(private router: Router, private api: ApiserviceService, private formBuilder: FormBuilder) { 
    this.myForm = this.formBuilder.group({
      lng1_c_name: ['' , Validators.required],
      lng2_c_name: [''],
      c_addr_1: ['' ],
      c_addr_2: [''],
      c_province: [''],
      c_zip_code: [''],
      c_tel_1: [''],
      c_tel_2: [''],
    });
  }

  ngOnInit(): void { 
    this.getRestaurantInfo();  
  }

  get myFormControl() {
    return this.myForm.controls;
  }

  async getRestaurantInfo() { 
    let mDataArray : any  = await this.api.getRestaurantInfo().toPromise(); 
    this.restaurantInfo =  mDataArray.c_data;

    this.myForm.setValue({
      lng1_c_name: this.restaurantInfo.lng1_c_name,
      lng2_c_name: this.restaurantInfo.lng2_c_name,
      c_addr_1: this.restaurantInfo.c_addr_1,
      c_addr_2: this.restaurantInfo.c_addr_2,
      c_province: this.restaurantInfo.c_province,
      c_zip_code: this.restaurantInfo.c_zip_code,
      c_tel_1: this.restaurantInfo.c_tel_1,
      c_tel_2: this.restaurantInfo.c_tel_2,
    });

     
  }  

  upload(){
    const input = document.getElementById("myPhotoList") as HTMLInputElement  ;
    input.click();
  }

  onImageChange(event:any) { 
    let fileList: FileList = event.target.files; 
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData(); 
        for (var i in fileList) {
	        formData.append("userfile", fileList[i]);
	      }  
        var c_img_name = file.name; 
        formData.append('c_img_name', c_img_name); 
        this.api.media("fr.media", formData).subscribe((res: any) => { 
          if(res.success){ 
            event.target.value = ''; 
            let data = res.c_data;
            this.restaurantInfo.media_id = data.media_id;
            this.restaurantInfo.c_media_name = data.c_media;

          } 
        }); 
    } 
  }

  onImageChangeList(event:any){
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
        let formData:FormData = new FormData(); 
        for (var i in fileList) {
	        formData.append("userfile", fileList[i]);
	      }  
        var c_img_name = file.name; 
        formData.append('c_img_name', c_img_name);
        this.api.media("fr.media", formData).subscribe((res: any) => { 
          if(res.success){ 
            event.target.value = ''; 
            let data = res.c_data;
            let obj = {
              media_id : data.media_id,
              c_media : data.c_media
            } 
            this.addImgList(obj);
          } 
        });
    } 
  }

  removeImgList(list : any, row:any){
    let idx = -1;
    
    for (let index = 0; index < list.length; index++) {
      const e = list[index];
      if(e.media_id==row.media_id){
        idx = index;
        break;
      }
      
    }

    console.log(idx)
    if (idx > -1) { // only splice array when item is found
      list.splice(idx, 1); // 2nd parameter means remove one item only
    }

    

    console.log(list)
  }

  addImgList(obj : any){
    if(this.restaurantInfo.c_setting.c_media_data==undefined){
      this.restaurantInfo.c_setting.c_media_data = [];
    } 
    this.restaurantInfo.c_setting.c_media_data.push(obj);
  }

  async doPost() { 
     
    let payload = this.myForm.value;
    if(this.myForm.valid){
      
      payload.id = this.restaurantInfo.id;
      
      console.log(payload);


      payload.media_id = this.restaurantInfo.media_id;
      payload.c_media_name = this.restaurantInfo.c_media_name;
      payload.c_setting = this.restaurantInfo.c_setting;

    }
    
  
    let result = await this.api.postRestaurantInfo(payload).toPromise();  
    console.log(result);
    if(result.success){
       this.api.showSwal('success', 'Save Complete', '');
    }

  }


  
 

}
