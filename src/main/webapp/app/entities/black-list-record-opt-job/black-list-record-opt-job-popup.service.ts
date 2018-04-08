import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BlackListRecordOptJob } from './black-list-record-opt-job.model';
import { BlackListRecordOptJobService } from './black-list-record-opt-job.service';

@Injectable()
export class BlackListRecordOptJobPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private blackListRecordService: BlackListRecordOptJobService

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
                this.blackListRecordService.find(id)
                    .subscribe((blackListRecordResponse: HttpResponse<BlackListRecordOptJob>) => {
                        const blackListRecord: BlackListRecordOptJob = blackListRecordResponse.body;
                        this.ngbModalRef = this.blackListRecordModalRef(component, blackListRecord);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.blackListRecordModalRef(component, new BlackListRecordOptJob());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    blackListRecordModalRef(component: Component, blackListRecord: BlackListRecordOptJob): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.blackListRecord = blackListRecord;
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
