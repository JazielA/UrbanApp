import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapsTestPage } from './maps-test.page';

describe('MapsTestPage', () => {
  let component: MapsTestPage;
  let fixture: ComponentFixture<MapsTestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MapsTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
