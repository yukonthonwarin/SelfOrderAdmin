import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  currentMenuId: any  = '' ;
  menuList : any = [];
  menuObjList : any = {};
 
  uofmList : any = [];
  uofmObjList : any = {};
 
  printerList : any = [];
  printerObjList : any = {};

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
      f_price :  [0 , Validators.required],
      uofm_id : ['0'],
      menu_id: ['', Validators.required ],  
      printer_id : ['0'],
    });
  }

  ngOnInit(): void {
    this.doGetPrinter();
    this.doGetUofm();
    this.doGetMenu();
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
      f_price : 0,
      uofm_id : '0',
      menu_id : this.menuList[0].menu_id,
      printer_id : '0',
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
      f_price: row.f_price*1, 
      uofm_id : row.uofm_id,
      menu_id: row.menu_id, 
      printer_id : row.printer_id,
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
            this.currentRow.c_media_name = data.c_media;
            this.currentRow.media_id = data.media_id;
  
          } 
        }); 
    } 
  }

  
  async doGetPrinter(){
    let mDataArray : any  = await this.api.get("printer.list").toPromise(); 
    this.printerList =  mDataArray.c_data;    
    for (const key in this.printerList) {
      const e = this.printerList[key];
      this.printerObjList[e.printer_id] = e; 
    }
  }

  async doGetUofm(){
    let mDataArray : any  = await this.api.get("fr.setuofm.list").toPromise(); 
    this.uofmList =  mDataArray.c_data;    
    for (const key in this.uofmList) {
      const e = this.uofmList[key];
      this.uofmObjList[e.uofm_id] = e; 
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

  async doGet(){ 
    let _w = "";
    if(this.currentMenuId!=undefined && this.currentMenuId!=""){
      _w = "?menu_id="+this.currentMenuId;
    }
    let mDataArray : any  = await this.api.get("fr.setitem.list"+_w).toPromise(); 
    this.dataList =  mDataArray.c_data;
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

}
