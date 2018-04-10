import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTattosComponent } from './all-tattos.component';

describe('AllTattosComponent', () => {
  let component: AllTattosComponent;
  let fixture: ComponentFixture<AllTattosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTattosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTattosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
