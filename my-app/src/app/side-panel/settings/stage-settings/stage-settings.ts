import { Component, OnInit } from '@angular/core';
import { Stage, StageService } from '../../../services/stage.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-stage-settings',
  standalone: true,
  imports: [   FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    CommonModule, CommonModule, HttpClientModule],
  templateUrl: './stage-settings.html',
  styleUrls: ['./stage-settings.css']
})

export class StageSettingsComponent implements OnInit {
  stages: Stage[] = [];
  saving = false;
  totalPercentage = 0;

  constructor(private stageService: StageService) {}

  ngOnInit(): void {
    // Fetch only parent stages
    this.stageService.getAllStages().subscribe(data => {
      this.stages = data;
      this.updateTotal();
    });
  }

  updateTotal(): void {
    this.totalPercentage = this.stages
      .filter(s => this.isMain(s))
      .reduce((sum, s) => sum + (s.paymentPercentage ?? 0), 0);
  }

  saveChanges(): void {
    if (this.totalPercentage !== 100) {
      alert('Total payment percentage must be exactly 100%.');
      return;
    }

    this.saving = true;

    const updates = this.stages
      .filter(s => this.isMain(s))
      .map(s => this.stageService.updateStage(s));

    Promise.all(updates.map(r => r.toPromise()))
      .then(() => {
        alert('Stage payments updated successfully.');
      })
      .finally(() => (this.saving = false));
  }

    isMain(stage: Stage): boolean {
    return stage.parentid === 0;
  }
}

