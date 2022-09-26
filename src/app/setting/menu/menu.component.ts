import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

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
      e_status: ['active' ],  
    });
  }

  ngOnInit(): void {
    this.doGet();
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
      lng2_c_name: row.lng2_c_name,
      c_seq: row.c_seq,
      e_status: row.e_status, 
    });

  }

  delete(row:any){
    this.currentRow = row;

    let header = "คุณต้องการลบรายการนี้ใช่หรือไม่";
    let body = row.lng1_c_name;
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

            console.log(data)

            this.currentRow.c_media_name = data.c_media;
            this.currentRow.media_id = data.media_id;
  
          } 
        }); 
    } 
  }

  async doGet(){
    let mDataArray : any  = await this.api.get("fr.setmenu.list").toPromise(); 
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
