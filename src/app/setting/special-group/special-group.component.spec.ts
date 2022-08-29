import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialGroupComponent } from './special-group.component';

describe('SpecialGroupComponent', () => {
  let component: SpecialGroupComponent;
  let fixture: ComponentFixture<SpecialGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
