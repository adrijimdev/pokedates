import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiftComponent } from './swipe.component';

describe('SwiftComponent', () => {
  let component: SwiftComponent;
  let fixture: ComponentFixture<SwiftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwiftComponent]
    });
    fixture = TestBed.createComponent(SwiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
