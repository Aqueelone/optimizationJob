import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CampaignRecordOptJob } from './campaign-record-opt-job.model';
import { CampaignRecordOptJobPopupService } from './campaign-record-opt-job-popup.service';
import { CampaignRecordOptJobService } from './campaign-record-opt-job.service';

@Component({
    selector: 'jhi-campaign-record-opt-job-delete-dialog',
    templateUrl: './campaign-record-opt-job-delete-dialog.component.html'
})
export class CampaignRecordOptJobDeleteDialogComponent {

    campaignRecord: CampaignRecordOptJob;

    constructor(
        private campaignRecordService: CampaignRecordOptJobService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.campaignRecordService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'campaignRecordListModification',
                content: 'Deleted an campaignRecord'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-campaign-record-opt-job-delete-popup',
    template: ''
})
export class CampaignRecordOptJobDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campaignRecordPopupService: CampaignRecordOptJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.campaignRecordPopupService
                .open(CampaignRecordOptJobDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
