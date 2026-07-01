import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavContent } from './sidenav-content';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FruitsStore } from '../../core/store/fruitsStore';

describe('SidenavContent', () => {
  let component: SidenavContent;
  let fixture: ComponentFixture<SidenavContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavContent],
      providers: [FruitsStore]
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
