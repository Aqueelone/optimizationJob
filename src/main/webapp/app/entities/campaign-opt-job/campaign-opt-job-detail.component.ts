import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CampaignOptJob } from './campaign-opt-job.model';
import { CampaignOptJobService } from './campaign-opt-job.service';

@Component({
    selector: 'jhi-campaign-opt-job-detail',
    templateUrl: './campaign-opt-job-detail.component.html'
})
export class CampaignOptJobDetailComponent implements OnInit, OnDestroy {

    campaign: CampaignOptJob;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private campaignService: CampaignOptJobService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCampaigns();
    }

    load(id) {
        this.campaignService.find(id)
            .subscribe((campaignResponse: HttpResponse<CampaignOptJob>) => {
                this.campaign = campaignResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCampaigns() {
        this.eventSubscriber = this.eventManager.subscribe(
            'campaignListModification',
            (response) => this.load(this.campaign.id)
        );
    }
}
