import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PublisherOptJob } from './publisher-opt-job.model';
import { PublisherOptJobService } from './publisher-opt-job.service';

@Component({
    selector: 'jhi-publisher-opt-job-detail',
    templateUrl: './publisher-opt-job-detail.component.html'
})
export class PublisherOptJobDetailComponent implements OnInit, OnDestroy {

    publisher: PublisherOptJob;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private publisherService: PublisherOptJobService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPublishers();
    }

    load(id) {
        this.publisherService.find(id)
            .subscribe((publisherResponse: HttpResponse<PublisherOptJob>) => {
                this.publisher = publisherResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPublishers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'publisherListModification',
            (response) => this.load(this.publisher.id)
        );
    }
}
