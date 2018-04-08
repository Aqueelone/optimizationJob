import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PublisherOptJob } from './publisher-opt-job.model';
import { PublisherOptJobPopupService } from './publisher-opt-job-popup.service';
import { PublisherOptJobService } from './publisher-opt-job.service';

@Component({
    selector: 'jhi-publisher-opt-job-delete-dialog',
    templateUrl: './publisher-opt-job-delete-dialog.component.html'
})
export class PublisherOptJobDeleteDialogComponent {

    publisher: PublisherOptJob;

    constructor(
        private publisherService: PublisherOptJobService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.publisherService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'publisherListModification',
                content: 'Deleted an publisher'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-publisher-opt-job-delete-popup',
    template: ''
})
export class PublisherOptJobDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private publisherPopupService: PublisherOptJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.publisherPopupService
                .open(PublisherOptJobDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
