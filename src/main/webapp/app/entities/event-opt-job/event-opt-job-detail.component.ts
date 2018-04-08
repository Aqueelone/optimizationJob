import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EventOptJob } from './event-opt-job.model';
import { EventOptJobService } from './event-opt-job.service';

@Component({
    selector: 'jhi-event-opt-job-detail',
    templateUrl: './event-opt-job-detail.component.html'
})
export class EventOptJobDetailComponent implements OnInit, OnDestroy {

    event: EventOptJob;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private eventService: EventOptJobService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEvents();
    }

    load(id) {
        this.eventService.find(id)
            .subscribe((eventResponse: HttpResponse<EventOptJob>) => {
                this.event = eventResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEvents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'eventListModification',
            (response) => this.load(this.event.id)
        );
    }
}
