import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EventOptJob } from './event-opt-job.model';
import { EventOptJobPopupService } from './event-opt-job-popup.service';
import { EventOptJobService } from './event-opt-job.service';
import { PublisherOptJob, PublisherOptJobService } from '../publisher-opt-job';
import { CampaignOptJob, CampaignOptJobService } from '../campaign-opt-job';

@Component({
    selector: 'jhi-event-opt-job-dialog',
    templateUrl: './event-opt-job-dialog.component.html'
})
export class EventOptJobDialogComponent implements OnInit {

    event: EventOptJob;
    isSaving: boolean;

    publishers: PublisherOptJob[];

    campaigns: CampaignOptJob[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventService: EventOptJobService,
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
        if (this.event.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eventService.update(this.event));
        } else {
            this.subscribeToSaveResponse(
                this.eventService.create(this.event));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EventOptJob>>) {
        result.subscribe((res: HttpResponse<EventOptJob>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EventOptJob) {
        this.eventManager.broadcast({ name: 'eventListModification', content: 'OK'});
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
    selector: 'jhi-event-opt-job-popup',
    template: ''
})
export class EventOptJobPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventPopupService: EventOptJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eventPopupService
                    .open(EventOptJobDialogComponent as Component, params['id']);
            } else {
                this.eventPopupService
                    .open(EventOptJobDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
