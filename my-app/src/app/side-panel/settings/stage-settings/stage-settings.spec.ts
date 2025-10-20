import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageSettings } from './stage-settings';

describe('StageSettings', () => {
  let component: StageSettings;
  let fixture: ComponentFixture<StageSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
