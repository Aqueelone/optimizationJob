import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OptimizationJobSharedModule } from '../../shared';
import {
    CampaignOptJobService,
    CampaignOptJobPopupService,
    CampaignOptJobComponent,
    CampaignOptJobDetailComponent,
    CampaignOptJobDialogComponent,
    CampaignOptJobPopupComponent,
    CampaignOptJobDeletePopupComponent,
    CampaignOptJobDeleteDialogComponent,
    campaignRoute,
    campaignPopupRoute,
} from './';

const ENTITY_STATES = [
    ...campaignRoute,
    ...campaignPopupRoute,
];

@NgModule({
    imports: [
        OptimizationJobSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CampaignOptJobComponent,
        CampaignOptJobDetailComponent,
        CampaignOptJobDialogComponent,
        CampaignOptJobDeleteDialogComponent,
        CampaignOptJobPopupComponent,
        CampaignOptJobDeletePopupComponent,
    ],
    entryComponents: [
        CampaignOptJobComponent,
        CampaignOptJobDialogComponent,
        CampaignOptJobPopupComponent,
        CampaignOptJobDeleteDialogComponent,
        CampaignOptJobDeletePopupComponent,
    ],
    providers: [
        CampaignOptJobService,
        CampaignOptJobPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OptimizationJobCampaignOptJobModule {}
