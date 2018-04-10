import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTattoComponent } from './create-tatto.component';

describe('CreateTattoComponent', () => {
  let component: CreateTattoComponent;
  let fixture: ComponentFixture<CreateTattoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTattoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTattoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
