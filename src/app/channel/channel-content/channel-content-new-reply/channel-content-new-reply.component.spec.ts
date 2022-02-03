import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelContentNewReplyComponent } from './channel-content-new-reply.component';

describe('ChannelContentNewReplyComponent', () => {
  let component: ChannelContentNewReplyComponent;
  let fixture: ComponentFixture<ChannelContentNewReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelContentNewReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelContentNewReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
