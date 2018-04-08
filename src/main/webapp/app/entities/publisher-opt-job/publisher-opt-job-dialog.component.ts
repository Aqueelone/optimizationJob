import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PublisherOptJob } from './publisher-opt-job.model';
import { PublisherOptJobPopupService } from './publisher-opt-job-popup.service';
import { PublisherOptJobService } from './publisher-opt-job.service';

@Component({
    selector: 'jhi-publisher-opt-job-dialog',
    templateUrl: './publisher-opt-job-dialog.component.html'
})
export class PublisherOptJobDialogComponent implements OnInit {

    publisher: PublisherOptJob;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private publisherService: PublisherOptJobService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.publisher.id !== undefined) {
            this.subscribeToSaveResponse(
                this.publisherService.update(this.publisher));
        } else {
            this.subscribeToSaveResponse(
                this.publisherService.create(this.publisher));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PublisherOptJob>>) {
        result.subscribe((res: HttpResponse<PublisherOptJob>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PublisherOptJob) {
        this.eventManager.broadcast({ name: 'publisherListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-publisher-opt-job-popup',
    template: ''
})
export class PublisherOptJobPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private publisherPopupService: PublisherOptJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.publisherPopupService
                    .open(PublisherOptJobDialogComponent as Component, params['id']);
            } else {
                this.publisherPopupService
                    .open(PublisherOptJobDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
