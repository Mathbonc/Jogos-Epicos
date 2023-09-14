import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfollowBtnComponent } from './unfollow-btn.component';

describe('UnfollowBtnComponent', () => {
  let component: UnfollowBtnComponent;
  let fixture: ComponentFixture<UnfollowBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnfollowBtnComponent]
    });
    fixture = TestBed.createComponent(UnfollowBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
