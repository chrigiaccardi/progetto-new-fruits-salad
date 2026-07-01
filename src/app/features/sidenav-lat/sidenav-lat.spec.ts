import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavLat } from './sidenav-lat';
import { FruitsStore } from '../../core/store/fruitsStore';

describe('SidenavLat', () => {
  let component: SidenavLat;
  let fixture: ComponentFixture<SidenavLat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavLat],
      providers: [FruitsStore]
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavLat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
