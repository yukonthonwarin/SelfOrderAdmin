import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbillComponent } from './listbill.component';

describe('ListbillComponent', () => {
  let component: ListbillComponent;
  let fixture: ComponentFixture<ListbillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListbillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
