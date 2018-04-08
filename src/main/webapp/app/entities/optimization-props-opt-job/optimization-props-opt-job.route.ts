import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OptimizationPropsOptJobComponent } from './optimization-props-opt-job.component';
import { OptimizationPropsOptJobDetailComponent } from './optimization-props-opt-job-detail.component';
import { OptimizationPropsOptJobPopupComponent } from './optimization-props-opt-job-dialog.component';
import { OptimizationPropsOptJobDeletePopupComponent } from './optimization-props-opt-job-delete-dialog.component';

export const optimizationPropsRoute: Routes = [
    {
        path: 'optimization-props-opt-job',
        component: OptimizationPropsOptJobComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OptimizationProps'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'optimization-props-opt-job/:id',
        component: OptimizationPropsOptJobDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OptimizationProps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const optimizationPropsPopupRoute: Routes = [
    {
        path: 'optimization-props-opt-job-new',
        component: OptimizationPropsOptJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OptimizationProps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'optimization-props-opt-job/:id/edit',
        component: OptimizationPropsOptJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OptimizationProps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'optimization-props-opt-job/:id/delete',
        component: OptimizationPropsOptJobDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OptimizationProps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
