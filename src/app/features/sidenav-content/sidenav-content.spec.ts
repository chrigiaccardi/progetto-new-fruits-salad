import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavContent } from './sidenav-content';
import { FruitsStore } from '../../core/store/fruitsStore';


describe('SidenavContent', () => {
  let component: SidenavContent;
  let fixture: ComponentFixture<SidenavContent>;
  // Istanziamo lo store
  let fruitsStoreMock:{}

  beforeEach(async () => {
    // Dichiariamo lo store
    fruitsStoreMock = {}

    await TestBed.configureTestingModule({
      imports: [SidenavContent],
      providers: [
        { provide: FruitsStore, useValue: fruitsStoreMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
