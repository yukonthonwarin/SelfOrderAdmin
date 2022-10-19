import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  currentZoneId: any  = '' ;
  zoneList : any = [];
  zoneObjList : any = {};

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
      zone_id: ['', Validators.required ],  
    });
  }

  ngOnInit(): void {
    this.doGetZone();
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
      zone_id : this.zoneList[0].zone_id
    };
    this.currentRow = row;
    this.myForm.setValue(row);
    console.log(this.zoneList)
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
      zone_id: row.zone_id, 
    });

  }

  delete(row:any){
    this.currentRow = row;

    let header = "คุณต้องการลบรายการนี้ใช่หรือไม่";
    let body = row.lng1_c_name;
    
    this.api.confirmSwal(header, body, () => {
      // confirm delete
      let payload = this.currentRow;
      payload.e_status = 'delete'; 
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

  async doGetZone(){
    let mDataArray : any  = await this.api.get("fr.setzone.list").toPromise(); 
    this.zoneList =  mDataArray.c_data;    
    for (const key in this.zoneList) {
      const e = this.zoneList[key];
      this.zoneObjList[e.zone_id] = e; 
    }
  }

  async doGet(){ 
    let _w = "";
    if(this.currentZoneId!=undefined && this.currentZoneId!=""){
      _w = "?zone_id="+this.currentZoneId;
    }
    let mDataArray : any  = await this.api.get("fr.settable.list"+_w).toPromise(); 
    this.dataList =  mDataArray.c_data;
  }

  async doPost(){

    let payload = this.myForm.value;
    if(this.myForm.valid){ 

      payload.c_media_name = this.currentRow.c_media_name;
      payload.media_id = this.currentRow.media_id;

      if(this.currentRow.table_id!=undefined)
        payload.table_id = this.currentRow.table_id;

      console.log(payload); 
      this.save(payload);
      

    } 
  }

  async save(payload:any){
    let result = await this.api.post("fr.settable.save", payload).toPromise();  
      console.log(result);
      if(result.success){
         this.api.showSwal('success', 'Save Complete', '');
         this.cancel();
         this.doGet();
      }
  }

}
