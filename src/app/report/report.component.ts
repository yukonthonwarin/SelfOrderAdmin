import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';


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

  constructor(private calendar: NgbCalendar) { 
    this.d_start = this.calendar.getToday();
    this.d_end = this.calendar.getToday();
    //this.date = { year:2022, month:9};
  }

  ngOnInit(): void {
  }
 
  doGet(){

  }

}
