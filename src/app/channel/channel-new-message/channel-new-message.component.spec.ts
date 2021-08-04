import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelNewMessageComponent } from './channel-new-message.component';

describe('ChannelNewMessageComponent', () => {
  let component: ChannelNewMessageComponent;
  let fixture: ComponentFixture<ChannelNewMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelNewMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelNewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
