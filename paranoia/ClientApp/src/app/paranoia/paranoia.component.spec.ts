import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParanoiaComponent } from './paranoia.component';

describe('ParanoiaComponent', () => {
  let component: ParanoiaComponent;
  let fixture: ComponentFixture<ParanoiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParanoiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParanoiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
