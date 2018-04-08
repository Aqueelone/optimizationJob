import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BlackListOptJob } from './black-list-opt-job.model';
import { BlackListOptJobPopupService } from './black-list-opt-job-popup.service';
import { BlackListOptJobService } from './black-list-opt-job.service';

@Component({
    selector: 'jhi-black-list-opt-job-delete-dialog',
    templateUrl: './black-list-opt-job-delete-dialog.component.html'
})
export class BlackListOptJobDeleteDialogComponent {

    blackList: BlackListOptJob;

    constructor(
        private blackListService: BlackListOptJobService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.blackListService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'blackListListModification',
                content: 'Deleted an blackList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-black-list-opt-job-delete-popup',
    template: ''
})
export class BlackListOptJobDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private blackListPopupService: BlackListOptJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.blackListPopupService
                .open(BlackListOptJobDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
