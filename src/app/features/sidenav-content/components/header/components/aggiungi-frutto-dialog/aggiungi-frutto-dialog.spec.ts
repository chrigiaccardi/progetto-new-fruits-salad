import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiFruttoDialog } from './aggiungi-frutto-dialog';
import { FruitsStore } from '../../../../../../core/store/fruitsStore';

describe('AggiungiFruttoDialog', () => {
  let component: AggiungiFruttoDialog;
  let fixture: ComponentFixture<AggiungiFruttoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiungiFruttoDialog],
      providers: [FruitsStore]
    }).compileComponents();

    fixture = TestBed.createComponent(AggiungiFruttoDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
