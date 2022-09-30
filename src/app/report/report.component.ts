import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from '../apiservice.service';
import * as moment from 'moment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public d_start: NgbDateStruct;
  public d_end: NgbDateStruct;
 // public date: {year: number, month: number}   ;

  currentReport : any;
  reportList : any = [];
  closeResult :any= '';
 

  constructor(private calendar: NgbCalendar,  private api: ApiserviceService, public sanitizer: DomSanitizer, private modalService: NgbModal) { 
    this.d_start = this.calendar.getToday();
    this.d_end = this.calendar.getToday();
    //this.date = { year:2022, month:9};
    this.doGet();
  }

  ngOnInit(): void {
  }
 
  async export(){ 
    let token = localStorage.token;
    
    let DateStart = "";
    if(this.currentReport.c_type.includes('DateStart')){
      DateStart = "&DateStart="+moment(this.d_start).format('YYYY-MM-DD');
    }

    let DateEnd = "";
    if(this.currentReport.c_type.includes('DateEnd')){
      DateEnd = "&DateEnd="+moment(this.d_end).format('YYYY-MM-DD');
    }
  
    let text = environment.baseURL+"report.get?report_format=PDF&token="+token+"&report_type="+this.currentReport.report_type+DateStart+DateEnd; 
    let url = this.sanitizer.bypassSecurityTrustResourceUrl(text); 
    window.open(text)

  
  }
 
  async doGet(){
    let mDataArray : any  = await this.api.get("report.list").toPromise(); 
    this.reportList =  mDataArray.c_data;
    this.currentReport = this.reportList[0];
  }

}
