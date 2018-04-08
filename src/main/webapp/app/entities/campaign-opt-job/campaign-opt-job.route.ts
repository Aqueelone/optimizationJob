import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CampaignOptJobComponent } from './campaign-opt-job.component';
import { CampaignOptJobDetailComponent } from './campaign-opt-job-detail.component';
import { CampaignOptJobPopupComponent } from './campaign-opt-job-dialog.component';
import { CampaignOptJobDeletePopupComponent } from './campaign-opt-job-delete-dialog.component';

export const campaignRoute: Routes = [
    {
        path: 'campaign-opt-job',
        component: CampaignOptJobComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'campaign-opt-job/:id',
        component: CampaignOptJobDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const campaignPopupRoute: Routes = [
    {
        path: 'campaign-opt-job-new',
        component: CampaignOptJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campaign-opt-job/:id/edit',
        component: CampaignOptJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campaign-opt-job/:id/delete',
        component: CampaignOptJobDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
