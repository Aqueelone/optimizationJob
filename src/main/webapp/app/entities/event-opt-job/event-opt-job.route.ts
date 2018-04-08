import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EventOptJobComponent } from './event-opt-job.component';
import { EventOptJobDetailComponent } from './event-opt-job-detail.component';
import { EventOptJobPopupComponent } from './event-opt-job-dialog.component';
import { EventOptJobDeletePopupComponent } from './event-opt-job-delete-dialog.component';

export const eventRoute: Routes = [
    {
        path: 'event-opt-job',
        component: EventOptJobComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Events'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'event-opt-job/:id',
        component: EventOptJobDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Events'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eventPopupRoute: Routes = [
    {
        path: 'event-opt-job-new',
        component: EventOptJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Events'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'event-opt-job/:id/edit',
        component: EventOptJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Events'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'event-opt-job/:id/delete',
        component: EventOptJobDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Events'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
