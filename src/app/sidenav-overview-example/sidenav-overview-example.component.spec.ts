import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavOverviewExampleComponent } from './sidenav-overview-example.component';

describe('SidenavOverviewExampleComponent', () => {
  let component: SidenavOverviewExampleComponent;
  let fixture: ComponentFixture<SidenavOverviewExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavOverviewExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavOverviewExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
