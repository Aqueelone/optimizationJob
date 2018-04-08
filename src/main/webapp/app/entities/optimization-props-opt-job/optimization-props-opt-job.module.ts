import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OptimizationJobSharedModule } from '../../shared';
import {
    OptimizationPropsOptJobService,
    OptimizationPropsOptJobPopupService,
    OptimizationPropsOptJobComponent,
    OptimizationPropsOptJobDetailComponent,
    OptimizationPropsOptJobDialogComponent,
    OptimizationPropsOptJobPopupComponent,
    OptimizationPropsOptJobDeletePopupComponent,
    OptimizationPropsOptJobDeleteDialogComponent,
    optimizationPropsRoute,
    optimizationPropsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...optimizationPropsRoute,
    ...optimizationPropsPopupRoute,
];

@NgModule({
    imports: [
        OptimizationJobSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OptimizationPropsOptJobComponent,
        OptimizationPropsOptJobDetailComponent,
        OptimizationPropsOptJobDialogComponent,
        OptimizationPropsOptJobDeleteDialogComponent,
        OptimizationPropsOptJobPopupComponent,
        OptimizationPropsOptJobDeletePopupComponent,
    ],
    entryComponents: [
        OptimizationPropsOptJobComponent,
        OptimizationPropsOptJobDialogComponent,
        OptimizationPropsOptJobPopupComponent,
        OptimizationPropsOptJobDeleteDialogComponent,
        OptimizationPropsOptJobDeletePopupComponent,
    ],
    providers: [
        OptimizationPropsOptJobService,
        OptimizationPropsOptJobPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OptimizationJobOptimizationPropsOptJobModule {}
