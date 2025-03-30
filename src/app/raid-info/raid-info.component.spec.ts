import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidInfoComponent } from './raid-info.component';

describe('RaidInfoComponent', () => {
  let component: RaidInfoComponent;
  let fixture: ComponentFixture<RaidInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaidInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaidInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
