import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoLavaPage } from './descricao-lava.page';

describe('DescricaoLavaPage', () => {
  let component: DescricaoLavaPage;
  let fixture: ComponentFixture<DescricaoLavaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescricaoLavaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoLavaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
