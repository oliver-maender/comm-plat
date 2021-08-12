import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmContentComponent } from './dm-content.component';

describe('DmContentComponent', () => {
  let component: DmContentComponent;
  let fixture: ComponentFixture<DmContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
