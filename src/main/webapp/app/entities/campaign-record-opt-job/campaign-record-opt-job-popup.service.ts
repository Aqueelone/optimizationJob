import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CampaignRecordOptJob } from './campaign-record-opt-job.model';
import { CampaignRecordOptJobService } from './campaign-record-opt-job.service';

@Injectable()
export class CampaignRecordOptJobPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private campaignRecordService: CampaignRecordOptJobService

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
                this.campaignRecordService.find(id)
                    .subscribe((campaignRecordResponse: HttpResponse<CampaignRecordOptJob>) => {
                        const campaignRecord: CampaignRecordOptJob = campaignRecordResponse.body;
                        this.ngbModalRef = this.campaignRecordModalRef(component, campaignRecord);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.campaignRecordModalRef(component, new CampaignRecordOptJob());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    campaignRecordModalRef(component: Component, campaignRecord: CampaignRecordOptJob): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.campaignRecord = campaignRecord;
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
