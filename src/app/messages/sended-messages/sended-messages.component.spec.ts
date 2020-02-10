import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendedMessagesComponent } from './sended-messages.component';

describe('SendedMessagesComponent', () => {
  let component: SendedMessagesComponent;
  let fixture: ComponentFixture<SendedMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendedMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendedMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
