import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BlackListRecordOptJob } from './black-list-record-opt-job.model';
import { BlackListRecordOptJobPopupService } from './black-list-record-opt-job-popup.service';
import { BlackListRecordOptJobService } from './black-list-record-opt-job.service';
import { PublisherOptJob, PublisherOptJobService } from '../publisher-opt-job';
import { BlackListOptJob, BlackListOptJobService } from '../black-list-opt-job';

@Component({
    selector: 'jhi-black-list-record-opt-job-dialog',
    templateUrl: './black-list-record-opt-job-dialog.component.html'
})
export class BlackListRecordOptJobDialogComponent implements OnInit {

    blackListRecord: BlackListRecordOptJob;
    isSaving: boolean;

    publishers: PublisherOptJob[];

    blacklists: BlackListOptJob[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private blackListRecordService: BlackListRecordOptJobService,
        private publisherService: PublisherOptJobService,
        private blackListService: BlackListOptJobService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.publisherService.query()
            .subscribe((res: HttpResponse<PublisherOptJob[]>) => { this.publishers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.blackListService.query()
            .subscribe((res: HttpResponse<BlackListOptJob[]>) => { this.blacklists = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.blackListRecord.id !== undefined) {
            this.subscribeToSaveResponse(
                this.blackListRecordService.update(this.blackListRecord));
        } else {
            this.subscribeToSaveResponse(
                this.blackListRecordService.create(this.blackListRecord));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BlackListRecordOptJob>>) {
        result.subscribe((res: HttpResponse<BlackListRecordOptJob>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BlackListRecordOptJob) {
        this.eventManager.broadcast({ name: 'blackListRecordListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPublisherById(index: number, item: PublisherOptJob) {
        return item.id;
    }

    trackBlackListById(index: number, item: BlackListOptJob) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-black-list-record-opt-job-popup',
    template: ''
})
export class BlackListRecordOptJobPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private blackListRecordPopupService: BlackListRecordOptJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.blackListRecordPopupService
                    .open(BlackListRecordOptJobDialogComponent as Component, params['id']);
            } else {
                this.blackListRecordPopupService
                    .open(BlackListRecordOptJobDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
