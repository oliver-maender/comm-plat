import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowUserListComponent } from './dialog-show-user-list.component';

describe('DialogShowUserListComponent', () => {
  let component: DialogShowUserListComponent;
  let fixture: ComponentFixture<DialogShowUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShowUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
