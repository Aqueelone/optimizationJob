import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OptimizationPropsOptJob } from './optimization-props-opt-job.model';
import { OptimizationPropsOptJobService } from './optimization-props-opt-job.service';

@Component({
    selector: 'jhi-optimization-props-opt-job-detail',
    templateUrl: './optimization-props-opt-job-detail.component.html'
})
export class OptimizationPropsOptJobDetailComponent implements OnInit, OnDestroy {

    optimizationProps: OptimizationPropsOptJob;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private optimizationPropsService: OptimizationPropsOptJobService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOptimizationProps();
    }

    load(id) {
        this.optimizationPropsService.find(id)
            .subscribe((optimizationPropsResponse: HttpResponse<OptimizationPropsOptJob>) => {
                this.optimizationProps = optimizationPropsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOptimizationProps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'optimizationPropsListModification',
            (response) => this.load(this.optimizationProps.id)
        );
    }
}
