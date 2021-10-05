import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStreamsComponent } from './edit-streams.component';

describe('EditStreamsComponent', () => {
  let component: EditStreamsComponent;
  let fixture: ComponentFixture<EditStreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStreamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
