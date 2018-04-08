import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BlackListRecordOptJob } from './black-list-record-opt-job.model';
import { BlackListRecordOptJobService } from './black-list-record-opt-job.service';

@Component({
    selector: 'jhi-black-list-record-opt-job-detail',
    templateUrl: './black-list-record-opt-job-detail.component.html'
})
export class BlackListRecordOptJobDetailComponent implements OnInit, OnDestroy {

    blackListRecord: BlackListRecordOptJob;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private blackListRecordService: BlackListRecordOptJobService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBlackListRecords();
    }

    load(id) {
        this.blackListRecordService.find(id)
            .subscribe((blackListRecordResponse: HttpResponse<BlackListRecordOptJob>) => {
                this.blackListRecord = blackListRecordResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBlackListRecords() {
        this.eventSubscriber = this.eventManager.subscribe(
            'blackListRecordListModification',
            (response) => this.load(this.blackListRecord.id)
        );
    }
}
