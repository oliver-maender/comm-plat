import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmNewMessageComponent } from './dm-new-message.component';

describe('DmNewMessageComponent', () => {
  let component: DmNewMessageComponent;
  let fixture: ComponentFixture<DmNewMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmNewMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmNewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
