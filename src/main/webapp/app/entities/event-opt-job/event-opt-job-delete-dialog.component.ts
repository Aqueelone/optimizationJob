import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EventOptJob } from './event-opt-job.model';
import { EventOptJobPopupService } from './event-opt-job-popup.service';
import { EventOptJobService } from './event-opt-job.service';

@Component({
    selector: 'jhi-event-opt-job-delete-dialog',
    templateUrl: './event-opt-job-delete-dialog.component.html'
})
export class EventOptJobDeleteDialogComponent {

    event: EventOptJob;

    constructor(
        private eventService: EventOptJobService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eventService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eventListModification',
                content: 'Deleted an event'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-event-opt-job-delete-popup',
    template: ''
})
export class EventOptJobDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventPopupService: EventOptJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.eventPopupService
                .open(EventOptJobDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
