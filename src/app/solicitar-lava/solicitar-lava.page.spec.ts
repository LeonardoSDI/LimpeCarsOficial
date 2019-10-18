import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarLavaPage } from './solicitar-lava.page';

describe('SolicitarLavaPage', () => {
  let component: SolicitarLavaPage;
  let fixture: ComponentFixture<SolicitarLavaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarLavaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarLavaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
