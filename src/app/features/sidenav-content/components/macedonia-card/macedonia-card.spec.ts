import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacedoniaCard } from './macedonia-card';

describe('MacedoniaCard', () => {
  let component: MacedoniaCard;
  let fixture: ComponentFixture<MacedoniaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacedoniaCard],
    }).compileComponents();

    fixture = TestBed.createComponent(MacedoniaCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
