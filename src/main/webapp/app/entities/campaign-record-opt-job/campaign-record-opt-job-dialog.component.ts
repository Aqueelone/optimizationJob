import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CampaignRecordOptJob } from './campaign-record-opt-job.model';
import { CampaignRecordOptJobPopupService } from './campaign-record-opt-job-popup.service';
import { CampaignRecordOptJobService } from './campaign-record-opt-job.service';
import { PublisherOptJob, PublisherOptJobService } from '../publisher-opt-job';
import { CampaignOptJob, CampaignOptJobService } from '../campaign-opt-job';

@Component({
    selector: 'jhi-campaign-record-opt-job-dialog',
    templateUrl: './campaign-record-opt-job-dialog.component.html'
})
export class CampaignRecordOptJobDialogComponent implements OnInit {

    campaignRecord: CampaignRecordOptJob;
    isSaving: boolean;

    publishers: PublisherOptJob[];

    campaigns: CampaignOptJob[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private campaignRecordService: CampaignRecordOptJobService,
        private publisherService: PublisherOptJobService,
        private campaignService: CampaignOptJobService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.publisherService.query()
            .subscribe((res: HttpResponse<PublisherOptJob[]>) => { this.publishers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.campaignService.query()
            .subscribe((res: HttpResponse<CampaignOptJob[]>) => { this.campaigns = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.campaignRecord.id !== undefined) {
            this.subscribeToSaveResponse(
                this.campaignRecordService.update(this.campaignRecord));
        } else {
            this.subscribeToSaveResponse(
                this.campaignRecordService.create(this.campaignRecord));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CampaignRecordOptJob>>) {
        result.subscribe((res: HttpResponse<CampaignRecordOptJob>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CampaignRecordOptJob) {
        this.eventManager.broadcast({ name: 'campaignRecordListModification', content: 'OK'});
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

    trackCampaignById(index: number, item: CampaignOptJob) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-campaign-record-opt-job-popup',
    template: ''
})
export class CampaignRecordOptJobPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campaignRecordPopupService: CampaignRecordOptJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.campaignRecordPopupService
                    .open(CampaignRecordOptJobDialogComponent as Component, params['id']);
            } else {
                this.campaignRecordPopupService
                    .open(CampaignRecordOptJobDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
