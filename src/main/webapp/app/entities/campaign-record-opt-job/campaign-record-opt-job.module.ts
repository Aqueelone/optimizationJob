import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OptimizationJobSharedModule } from '../../shared';
import {
    CampaignRecordOptJobService,
    CampaignRecordOptJobPopupService,
    CampaignRecordOptJobComponent,
    CampaignRecordOptJobDetailComponent,
    CampaignRecordOptJobDialogComponent,
    CampaignRecordOptJobPopupComponent,
    CampaignRecordOptJobDeletePopupComponent,
    CampaignRecordOptJobDeleteDialogComponent,
    campaignRecordRoute,
    campaignRecordPopupRoute,
} from './';

const ENTITY_STATES = [
    ...campaignRecordRoute,
    ...campaignRecordPopupRoute,
];

@NgModule({
    imports: [
        OptimizationJobSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CampaignRecordOptJobComponent,
        CampaignRecordOptJobDetailComponent,
        CampaignRecordOptJobDialogComponent,
        CampaignRecordOptJobDeleteDialogComponent,
        CampaignRecordOptJobPopupComponent,
        CampaignRecordOptJobDeletePopupComponent,
    ],
    entryComponents: [
        CampaignRecordOptJobComponent,
        CampaignRecordOptJobDialogComponent,
        CampaignRecordOptJobPopupComponent,
        CampaignRecordOptJobDeleteDialogComponent,
        CampaignRecordOptJobDeletePopupComponent,
    ],
    providers: [
        CampaignRecordOptJobService,
        CampaignRecordOptJobPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OptimizationJobCampaignRecordOptJobModule {}
