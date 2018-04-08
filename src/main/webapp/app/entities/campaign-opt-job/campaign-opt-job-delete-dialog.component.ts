import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CampaignOptJob } from './campaign-opt-job.model';
import { CampaignOptJobPopupService } from './campaign-opt-job-popup.service';
import { CampaignOptJobService } from './campaign-opt-job.service';

@Component({
    selector: 'jhi-campaign-opt-job-delete-dialog',
    templateUrl: './campaign-opt-job-delete-dialog.component.html'
})
export class CampaignOptJobDeleteDialogComponent {

    campaign: CampaignOptJob;

    constructor(
        private campaignService: CampaignOptJobService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.campaignService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'campaignListModification',
                content: 'Deleted an campaign'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-campaign-opt-job-delete-popup',
    template: ''
})
export class CampaignOptJobDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campaignPopupService: CampaignOptJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.campaignPopupService
                .open(CampaignOptJobDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
