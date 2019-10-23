import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleMapasPage } from './controle-mapas.page';

describe('ControleMapasPage', () => {
  let component: ControleMapasPage;
  let fixture: ComponentFixture<ControleMapasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleMapasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleMapasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
