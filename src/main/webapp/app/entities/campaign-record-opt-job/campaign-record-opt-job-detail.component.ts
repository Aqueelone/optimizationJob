import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CampaignRecordOptJob } from './campaign-record-opt-job.model';
import { CampaignRecordOptJobService } from './campaign-record-opt-job.service';

@Component({
    selector: 'jhi-campaign-record-opt-job-detail',
    templateUrl: './campaign-record-opt-job-detail.component.html'
})
export class CampaignRecordOptJobDetailComponent implements OnInit, OnDestroy {

    campaignRecord: CampaignRecordOptJob;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private campaignRecordService: CampaignRecordOptJobService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCampaignRecords();
    }

    load(id) {
        this.campaignRecordService.find(id)
            .subscribe((campaignRecordResponse: HttpResponse<CampaignRecordOptJob>) => {
                this.campaignRecord = campaignRecordResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCampaignRecords() {
        this.eventSubscriber = this.eventManager.subscribe(
            'campaignRecordListModification',
            (response) => this.load(this.campaignRecord.id)
        );
    }
}
