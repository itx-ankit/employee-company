import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGenrateComponent } from './table-genrate.component';

describe('TableGenrateComponent', () => {
  let component: TableGenrateComponent;
  let fixture: ComponentFixture<TableGenrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableGenrateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableGenrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
