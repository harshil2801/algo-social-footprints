import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStreamsComponent } from './new-streams.component';

describe('NewStreamsComponent', () => {
  let component: NewStreamsComponent;
  let fixture: ComponentFixture<NewStreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStreamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
