import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UofmComponent } from './uofm.component';

describe('UofmComponent', () => {
  let component: UofmComponent;
  let fixture: ComponentFixture<UofmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UofmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UofmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
