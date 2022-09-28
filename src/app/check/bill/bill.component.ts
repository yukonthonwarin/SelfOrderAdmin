import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  dataList : any = [];
  sub : any;
  order_hdr_id : any = '0';

  constructor(private _Activatedroute:ActivatedRoute,private api: ApiserviceService) { }

  ngOnInit(): void { 
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      console.log(params);
      this.order_hdr_id = params.get('order_hdr_id');  
    }); 
    this.doGet();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async confirm(row:any){
    console.log(row)
    if(row._check){
      console.log('do confirm');

   
      let url = "order.calculator?order_hdr_id="+ row.hdr.order_hdr_id + "&service_change1[chk]=0&vat1[chk]=1&vat1[pct]=7&vat1[type]=include";
      let param = {
        order_hdr_id : row.hdr.order_hdr_id,
        service_change1 : { chk:0},
        vat1 : {chk:1, pct:7, type:'include'}
      }
      let r1 : any = await this.api.get(url).toPromise();  
      let r2 = r1.c_data; 
       
      let payload = {
        hdr : {order_hdr_id:row.hdr.order_hdr_id},
        paytype : [{
          i_cash_chk : 1, //บอกว่าจะจ่ายด้วย เงินสด
          f_cash_amt : r2['f_doc_price_total'] ,
          e_type : 'paytype',  // fix paytype
          c_type : 'cash',
          f_price_total : r2['f_doc_price_total'] 
        }]
      }
      let result = await this.api.post("payment.save", payload).toPromise();  
      console.log(result);
      if(result.success){
         this.api.showSwal('success', 'Save Complete', ''); 
         this.doGet();
      }

    }

  }

  async doGet(){ 
    let today : any = moment().format('YYYY-MM-DD');
    let r1 : any  = await this.api.get("order.list?e_action=print_bill&date="+today).toPromise(); 
    if(r1['success']){
      this.dataList = [];
      for (const key in r1.c_data) {
        let element = r1.c_data[key];
        element['f_doc_amt'] = 0;
        element['_check'] = false;
        if(element['hdr']['order_hdr_id']==this.order_hdr_id){
          element['_check'] = true;
        }
        for (const k2 in element['dtl']) {
          const d = element['dtl'][k2];
          element['f_doc_amt']  += (d['f_price_total']*1); 
        }
        this.dataList.push(element);
      }
    } 

  }

}
