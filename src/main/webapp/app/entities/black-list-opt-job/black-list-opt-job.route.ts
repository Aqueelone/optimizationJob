import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BlackListOptJobComponent } from './black-list-opt-job.component';
import { BlackListOptJobDetailComponent } from './black-list-opt-job-detail.component';
import { BlackListOptJobPopupComponent } from './black-list-opt-job-dialog.component';
import { BlackListOptJobDeletePopupComponent } from './black-list-opt-job-delete-dialog.component';

export const blackListRoute: Routes = [
    {
        path: 'black-list-opt-job',
        component: BlackListOptJobComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlackLists'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'black-list-opt-job/:id',
        component: BlackListOptJobDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlackLists'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const blackListPopupRoute: Routes = [
    {
        path: 'black-list-opt-job-new',
        component: BlackListOptJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlackLists'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'black-list-opt-job/:id/edit',
        component: BlackListOptJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlackLists'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'black-list-opt-job/:id/delete',
        component: BlackListOptJobDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlackLists'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
