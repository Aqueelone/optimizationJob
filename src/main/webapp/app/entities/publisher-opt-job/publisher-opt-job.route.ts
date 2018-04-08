import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PublisherOptJobComponent } from './publisher-opt-job.component';
import { PublisherOptJobDetailComponent } from './publisher-opt-job-detail.component';
import { PublisherOptJobPopupComponent } from './publisher-opt-job-dialog.component';
import { PublisherOptJobDeletePopupComponent } from './publisher-opt-job-delete-dialog.component';

export const publisherRoute: Routes = [
    {
        path: 'publisher-opt-job',
        component: PublisherOptJobComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Publishers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'publisher-opt-job/:id',
        component: PublisherOptJobDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Publishers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const publisherPopupRoute: Routes = [
    {
        path: 'publisher-opt-job-new',
        component: PublisherOptJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Publishers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'publisher-opt-job/:id/edit',
        component: PublisherOptJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Publishers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'publisher-opt-job/:id/delete',
        component: PublisherOptJobDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Publishers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
