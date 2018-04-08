import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CampaignOptJob } from './campaign-opt-job.model';
import { CampaignOptJobPopupService } from './campaign-opt-job-popup.service';
import { CampaignOptJobService } from './campaign-opt-job.service';
import { OptimizationPropsOptJob, OptimizationPropsOptJobService } from '../optimization-props-opt-job';
import { BlackListOptJob, BlackListOptJobService } from '../black-list-opt-job';

@Component({
    selector: 'jhi-campaign-opt-job-dialog',
    templateUrl: './campaign-opt-job-dialog.component.html'
})
export class CampaignOptJobDialogComponent implements OnInit {

    campaign: CampaignOptJob;
    isSaving: boolean;

    optimizationprops: OptimizationPropsOptJob[];

    blacklists: BlackListOptJob[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private campaignService: CampaignOptJobService,
        private optimizationPropsService: OptimizationPropsOptJobService,
        private blackListService: BlackListOptJobService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.optimizationPropsService
            .query({filter: 'campaign-is-null'})
            .subscribe((res: HttpResponse<OptimizationPropsOptJob[]>) => {
                if (!this.campaign.optimizationPropsId) {
                    this.optimizationprops = res.body;
                } else {
                    this.optimizationPropsService
                        .find(this.campaign.optimizationPropsId)
                        .subscribe((subRes: HttpResponse<OptimizationPropsOptJob>) => {
                            this.optimizationprops = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.blackListService
            .query({filter: 'campaign-is-null'})
            .subscribe((res: HttpResponse<BlackListOptJob[]>) => {
                if (!this.campaign.blacklistId) {
                    this.blacklists = res.body;
                } else {
                    this.blackListService
                        .find(this.campaign.blacklistId)
                        .subscribe((subRes: HttpResponse<BlackListOptJob>) => {
                            this.blacklists = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.campaign.id !== undefined) {
            this.subscribeToSaveResponse(
                this.campaignService.update(this.campaign));
        } else {
            this.subscribeToSaveResponse(
                this.campaignService.create(this.campaign));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CampaignOptJob>>) {
        result.subscribe((res: HttpResponse<CampaignOptJob>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CampaignOptJob) {
        this.eventManager.broadcast({ name: 'campaignListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOptimizationPropsById(index: number, item: OptimizationPropsOptJob) {
        return item.id;
    }

    trackBlackListById(index: number, item: BlackListOptJob) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-campaign-opt-job-popup',
    template: ''
})
export class CampaignOptJobPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campaignPopupService: CampaignOptJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.campaignPopupService
                    .open(CampaignOptJobDialogComponent as Component, params['id']);
            } else {
                this.campaignPopupService
                    .open(CampaignOptJobDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
