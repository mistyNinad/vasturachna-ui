import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDetails } from './projects-details';

describe('ProjectsDetails', () => {
  let component: ProjectsDetails;
  let fixture: ComponentFixture<ProjectsDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
