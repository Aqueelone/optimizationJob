import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BlackListRecordOptJobComponent } from './black-list-record-opt-job.component';
import { BlackListRecordOptJobDetailComponent } from './black-list-record-opt-job-detail.component';
import { BlackListRecordOptJobPopupComponent } from './black-list-record-opt-job-dialog.component';
import { BlackListRecordOptJobDeletePopupComponent } from './black-list-record-opt-job-delete-dialog.component';

export const blackListRecordRoute: Routes = [
    {
        path: 'black-list-record-opt-job',
        component: BlackListRecordOptJobComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlackListRecords'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'black-list-record-opt-job/:id',
        component: BlackListRecordOptJobDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlackListRecords'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const blackListRecordPopupRoute: Routes = [
    {
        path: 'black-list-record-opt-job-new',
        component: BlackListRecordOptJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlackListRecords'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'black-list-record-opt-job/:id/edit',
        component: BlackListRecordOptJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlackListRecords'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'black-list-record-opt-job/:id/delete',
        component: BlackListRecordOptJobDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlackListRecords'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
