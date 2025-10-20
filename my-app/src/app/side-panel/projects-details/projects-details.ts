import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../services/auth';
import { ProjectService } from '../../services/project.service';
import { StageService } from '../../services/stage.service';
import { PaymentService, Payment } from '../../services/payment.service';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-projects-details',
    standalone: true, // ✅ add this
  imports: [CommonModule,FormsModule],
  templateUrl: './projects-details.html',
  styleUrl: './projects-details.css'
})
export class ProjectsDetails implements OnInit {
  project: any = null;
  loading = true;
  stages: any[] = [];
  payments: Payment[] = [];
  newPayment: Partial<Payment> = { amount: 0, paymentMode: '' };
  paymentsLoading: boolean =true;
  paymentSummary : any =null;
  progressions: any[] = []; // will hold ProjectStageProgression items

  constructor(private cd: ChangeDetectorRef , private paymentService: PaymentService,private authService: AuthService, private route: ActivatedRoute, private projectService: ProjectService,
    private stageService: StageService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    
    forkJoin({
      project: this.projectService.getProjectById(projectId),
      stages: this.stageService.getAllStages(false),
      progressions: this.projectService.getStageProgressions(projectId)
    }).subscribe(({ project, stages,progressions }) => {
      this.project = project;
      this.progressions = progressions || [];

      this.attachProgressionsToStages(stages, this.progressions);
      // build tree
      this.stages = this.buildStageTree(stages, project.stage.id);
      if (this.project?.id) {
        this.loadPayments();
        console.log(this.payments)
      }
      this.loading = false;
    this.cd.detectChanges();
    });

  }

/**
 * Attach matching progression (if any) to each stage object as `stage.progress`.
 * Uses stage.id === progression.stage.id match.
 */
private attachProgressionsToStages(allStages: any[], progressions: any[]) {
  const progMap = new Map<number, any>();
  (progressions || []).forEach(p => {
    // ensure stage id exists in progression shape. adjust if backend uses p.stage.id or p.stageId
    const sid = p.stage?.id ?? p.stageId ?? null;
    if (sid != null) progMap.set(Number(sid), p);
  });

  allStages.forEach(s => {
    s.progress = progMap.get(s.id) ?? null;
  });
}


  private buildStageTree(stages: any[], currentStageId: number) {
    const stageMap = new Map <number, any>();
  
    stages.forEach(stage => {
      // when building stages (attachProgressionsToStages or buildStageTree)
      stage.statusSymbol = stage.progress?.completedOn ? 'COMPLETED' : (stage.progress?.startedOn ? 'IN_PROGRESS' : 'NOT_STARTED');

      stage.children = stage.children ?? [];
      stage.active = stage.id === currentStageId;
      stageMap.set(stage.id, stage);
    });
  
    const tree: any[] = [];
  
    stages.forEach(stage => {
      if (stage.parentid && stageMap.has(stage.parentid)) {
        stageMap.get(stage.parentid).children.push(stage);
      } else {
        tree.push(stage);
      }
    });
  
    return tree.sort((a, b) => a.order - b.order);
  }

  completeStage(project: any) {
    const userId = this.authService.getLoggedInUserId(); // or however you store logged-in user
    if (userId !== null) {
    this.projectService.advanceStage(project.id, userId).subscribe({
      next: (updatedProgression: any) => {
        project.currentStage = updatedProgression?.stage || null;
        const msg = updatedProgression
          ? `Next stage: ${updatedProgression.stage.name}`
          : 'Project completed!';
        this.snackBar.open(msg, 'OK', { duration: 3000 });
        // reload page
        window.location.reload();
      },
      error: (err) => {
        this.snackBar.open('Failed to complete stage', 'OK', { duration: 3000 });
        console.error(err);
      }
    });
  } else {
    console.error('No logged in user found!');
  }
}

loadPayments() {
  console.log('loading payments')
  this.paymentService.getPaymentsByProject(this.project.id).subscribe({
    next: (data) => {this.paymentSummary = data;
      this.payments=this.paymentSummary.payments;
    console.log(data);
      console.log(this.payments);
      this.paymentsLoading = false;
      console.log(this.paymentsLoading)
      this.cd.detectChanges()
  },
    error: (err) => console.error('Error loading payments', err)
  });
}

addPayment() {
  const payerId = this.authService.getLoggedInUserId(); // mock user
  if (!payerId) {
    console.error('User not logged in');
    alert('Please log in first!');
    return;
  }
  const payment: Payment = {
    projectId: this.project.id,
    payerId,
    amount: this.newPayment.amount!,
    paymentMode: this.newPayment.paymentMode!,
    referenceNumber: this.newPayment.referenceNumber || '',
    remarks: this.newPayment.remarks || '',
    statusCode: 'COMPLETED'
  };

  this.paymentService.createPayment(payment).subscribe({
    next: (res) => {
      this.payments.push(res);
      this.newPayment = { amount: 0, paymentMode: '' };
      this.cd.detectChanges()
    },
    error: (err) => console.error('Error saving payment', err)
  });
}
}