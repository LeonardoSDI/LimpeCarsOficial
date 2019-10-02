import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarMapsPage } from './mostrar-maps.page';

describe('MostrarMapsPage', () => {
  let component: MostrarMapsPage;
  let fixture: ComponentFixture<MostrarMapsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarMapsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarMapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
