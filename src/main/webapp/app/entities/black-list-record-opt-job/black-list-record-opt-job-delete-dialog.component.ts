import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BlackListRecordOptJob } from './black-list-record-opt-job.model';
import { BlackListRecordOptJobPopupService } from './black-list-record-opt-job-popup.service';
import { BlackListRecordOptJobService } from './black-list-record-opt-job.service';

@Component({
    selector: 'jhi-black-list-record-opt-job-delete-dialog',
    templateUrl: './black-list-record-opt-job-delete-dialog.component.html'
})
export class BlackListRecordOptJobDeleteDialogComponent {

    blackListRecord: BlackListRecordOptJob;

    constructor(
        private blackListRecordService: BlackListRecordOptJobService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.blackListRecordService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'blackListRecordListModification',
                content: 'Deleted an blackListRecord'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-black-list-record-opt-job-delete-popup',
    template: ''
})
export class BlackListRecordOptJobDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private blackListRecordPopupService: BlackListRecordOptJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.blackListRecordPopupService
                .open(BlackListRecordOptJobDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
