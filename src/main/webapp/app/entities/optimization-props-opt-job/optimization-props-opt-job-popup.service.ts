import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { OptimizationPropsOptJob } from './optimization-props-opt-job.model';
import { OptimizationPropsOptJobService } from './optimization-props-opt-job.service';

@Injectable()
export class OptimizationPropsOptJobPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private optimizationPropsService: OptimizationPropsOptJobService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.optimizationPropsService.find(id)
                    .subscribe((optimizationPropsResponse: HttpResponse<OptimizationPropsOptJob>) => {
                        const optimizationProps: OptimizationPropsOptJob = optimizationPropsResponse.body;
                        this.ngbModalRef = this.optimizationPropsModalRef(component, optimizationProps);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.optimizationPropsModalRef(component, new OptimizationPropsOptJob());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    optimizationPropsModalRef(component: Component, optimizationProps: OptimizationPropsOptJob): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.optimizationProps = optimizationProps;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
