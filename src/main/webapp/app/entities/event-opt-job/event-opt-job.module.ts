import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OptimizationJobSharedModule } from '../../shared';
import {
    EventOptJobService,
    EventOptJobPopupService,
    EventOptJobComponent,
    EventOptJobDetailComponent,
    EventOptJobDialogComponent,
    EventOptJobPopupComponent,
    EventOptJobDeletePopupComponent,
    EventOptJobDeleteDialogComponent,
    eventRoute,
    eventPopupRoute,
} from './';

const ENTITY_STATES = [
    ...eventRoute,
    ...eventPopupRoute,
];

@NgModule({
    imports: [
        OptimizationJobSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EventOptJobComponent,
        EventOptJobDetailComponent,
        EventOptJobDialogComponent,
        EventOptJobDeleteDialogComponent,
        EventOptJobPopupComponent,
        EventOptJobDeletePopupComponent,
    ],
    entryComponents: [
        EventOptJobComponent,
        EventOptJobDialogComponent,
        EventOptJobPopupComponent,
        EventOptJobDeleteDialogComponent,
        EventOptJobDeletePopupComponent,
    ],
    providers: [
        EventOptJobService,
        EventOptJobPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OptimizationJobEventOptJobModule {}
