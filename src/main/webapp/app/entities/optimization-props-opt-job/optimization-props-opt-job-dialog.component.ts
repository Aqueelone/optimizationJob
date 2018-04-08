import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OptimizationPropsOptJob } from './optimization-props-opt-job.model';
import { OptimizationPropsOptJobPopupService } from './optimization-props-opt-job-popup.service';
import { OptimizationPropsOptJobService } from './optimization-props-opt-job.service';

@Component({
    selector: 'jhi-optimization-props-opt-job-dialog',
    templateUrl: './optimization-props-opt-job-dialog.component.html'
})
export class OptimizationPropsOptJobDialogComponent implements OnInit {

    optimizationProps: OptimizationPropsOptJob;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private optimizationPropsService: OptimizationPropsOptJobService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.optimizationProps.id !== undefined) {
            this.subscribeToSaveResponse(
                this.optimizationPropsService.update(this.optimizationProps));
        } else {
            this.subscribeToSaveResponse(
                this.optimizationPropsService.create(this.optimizationProps));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OptimizationPropsOptJob>>) {
        result.subscribe((res: HttpResponse<OptimizationPropsOptJob>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OptimizationPropsOptJob) {
        this.eventManager.broadcast({ name: 'optimizationPropsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-optimization-props-opt-job-popup',
    template: ''
})
export class OptimizationPropsOptJobPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private optimizationPropsPopupService: OptimizationPropsOptJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.optimizationPropsPopupService
                    .open(OptimizationPropsOptJobDialogComponent as Component, params['id']);
            } else {
                this.optimizationPropsPopupService
                    .open(OptimizationPropsOptJobDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
