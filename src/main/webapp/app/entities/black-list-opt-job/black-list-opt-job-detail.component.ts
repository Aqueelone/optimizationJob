import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BlackListOptJob } from './black-list-opt-job.model';
import { BlackListOptJobService } from './black-list-opt-job.service';

@Component({
    selector: 'jhi-black-list-opt-job-detail',
    templateUrl: './black-list-opt-job-detail.component.html'
})
export class BlackListOptJobDetailComponent implements OnInit, OnDestroy {

    blackList: BlackListOptJob;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private blackListService: BlackListOptJobService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBlackLists();
    }

    load(id) {
        this.blackListService.find(id)
            .subscribe((blackListResponse: HttpResponse<BlackListOptJob>) => {
                this.blackList = blackListResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBlackLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'blackListListModification',
            (response) => this.load(this.blackList.id)
        );
    }
}
