import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CampaignRecordOptJobComponent } from './campaign-record-opt-job.component';
import { CampaignRecordOptJobDetailComponent } from './campaign-record-opt-job-detail.component';
import { CampaignRecordOptJobPopupComponent } from './campaign-record-opt-job-dialog.component';
import { CampaignRecordOptJobDeletePopupComponent } from './campaign-record-opt-job-delete-dialog.component';

export const campaignRecordRoute: Routes = [
    {
        path: 'campaign-record-opt-job',
        component: CampaignRecordOptJobComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CampaignRecords'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'campaign-record-opt-job/:id',
        component: CampaignRecordOptJobDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CampaignRecords'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const campaignRecordPopupRoute: Routes = [
    {
        path: 'campaign-record-opt-job-new',
        component: CampaignRecordOptJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CampaignRecords'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campaign-record-opt-job/:id/edit',
        component: CampaignRecordOptJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CampaignRecords'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campaign-record-opt-job/:id/delete',
        component: CampaignRecordOptJobDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CampaignRecords'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
