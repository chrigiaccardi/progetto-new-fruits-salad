import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { SidenavContent } from './sidenav-content';
import { FruitsStore } from '../../core/store/fruitsStore';



describe('SidenavContent', () => {
  let component: SidenavContent;
  let fixture: ComponentFixture<SidenavContent>;
  // Istanziamo lo store
  let fruitsStoreMock: {}

  @Component({
    selector: 'app-header',
    template: ''
  })
  class mockHeader { }
  
  @Component({
    selector: 'app-macedonia-card',
    template: ''
  })
  class mockMacedoniaCard { }
  
  @Component({
    selector: 'app-lista-frutti',
    template: ''
  })
  class mockListaFruttiCard {}

  beforeEach(async () => {
    // Dichiariamo lo store
    fruitsStoreMock = {}

    await TestBed.configureTestingModule({
      imports: [
        SidenavContent,
        mockMacedoniaCard,
        mockHeader,
        mockListaFruttiCard
      ],
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
