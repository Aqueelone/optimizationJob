import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BlackListOptJob } from './black-list-opt-job.model';
import { BlackListOptJobPopupService } from './black-list-opt-job-popup.service';
import { BlackListOptJobService } from './black-list-opt-job.service';

@Component({
    selector: 'jhi-black-list-opt-job-dialog',
    templateUrl: './black-list-opt-job-dialog.component.html'
})
export class BlackListOptJobDialogComponent implements OnInit {

    blackList: BlackListOptJob;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private blackListService: BlackListOptJobService,
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
        if (this.blackList.id !== undefined) {
            this.subscribeToSaveResponse(
                this.blackListService.update(this.blackList));
        } else {
            this.subscribeToSaveResponse(
                this.blackListService.create(this.blackList));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BlackListOptJob>>) {
        result.subscribe((res: HttpResponse<BlackListOptJob>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BlackListOptJob) {
        this.eventManager.broadcast({ name: 'blackListListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-black-list-opt-job-popup',
    template: ''
})
export class BlackListOptJobPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private blackListPopupService: BlackListOptJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.blackListPopupService
                    .open(BlackListOptJobDialogComponent as Component, params['id']);
            } else {
                this.blackListPopupService
                    .open(BlackListOptJobDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
