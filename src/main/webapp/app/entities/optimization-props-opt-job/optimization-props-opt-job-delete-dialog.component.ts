import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OptimizationPropsOptJob } from './optimization-props-opt-job.model';
import { OptimizationPropsOptJobPopupService } from './optimization-props-opt-job-popup.service';
import { OptimizationPropsOptJobService } from './optimization-props-opt-job.service';

@Component({
    selector: 'jhi-optimization-props-opt-job-delete-dialog',
    templateUrl: './optimization-props-opt-job-delete-dialog.component.html'
})
export class OptimizationPropsOptJobDeleteDialogComponent {

    optimizationProps: OptimizationPropsOptJob;

    constructor(
        private optimizationPropsService: OptimizationPropsOptJobService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.optimizationPropsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'optimizationPropsListModification',
                content: 'Deleted an optimizationProps'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-optimization-props-opt-job-delete-popup',
    template: ''
})
export class OptimizationPropsOptJobDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private optimizationPropsPopupService: OptimizationPropsOptJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.optimizationPropsPopupService
                .open(OptimizationPropsOptJobDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
