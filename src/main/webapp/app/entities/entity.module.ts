import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { OptimizationJobEventOptJobModule } from './event-opt-job/event-opt-job.module';
import { OptimizationJobPublisherOptJobModule } from './publisher-opt-job/publisher-opt-job.module';
import { OptimizationJobCampaignOptJobModule } from './campaign-opt-job/campaign-opt-job.module';
import { OptimizationJobCampaignRecordOptJobModule } from './campaign-record-opt-job/campaign-record-opt-job.module';
import { OptimizationJobOptimizationPropsOptJobModule } from './optimization-props-opt-job/optimization-props-opt-job.module';
import { OptimizationJobBlackListOptJobModule } from './black-list-opt-job/black-list-opt-job.module';
import { OptimizationJobBlackListRecordOptJobModule } from './black-list-record-opt-job/black-list-record-opt-job.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        OptimizationJobEventOptJobModule,
        OptimizationJobPublisherOptJobModule,
        OptimizationJobCampaignOptJobModule,
        OptimizationJobCampaignRecordOptJobModule,
        OptimizationJobOptimizationPropsOptJobModule,
        OptimizationJobBlackListOptJobModule,
        OptimizationJobBlackListRecordOptJobModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OptimizationJobEntityModule {}
