import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OptimizationJobSharedModule } from '../../shared';
import {
    BlackListRecordOptJobService,
    BlackListRecordOptJobPopupService,
    BlackListRecordOptJobComponent,
    BlackListRecordOptJobDetailComponent,
    BlackListRecordOptJobDialogComponent,
    BlackListRecordOptJobPopupComponent,
    BlackListRecordOptJobDeletePopupComponent,
    BlackListRecordOptJobDeleteDialogComponent,
    blackListRecordRoute,
    blackListRecordPopupRoute,
} from './';

const ENTITY_STATES = [
    ...blackListRecordRoute,
    ...blackListRecordPopupRoute,
];

@NgModule({
    imports: [
        OptimizationJobSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BlackListRecordOptJobComponent,
        BlackListRecordOptJobDetailComponent,
        BlackListRecordOptJobDialogComponent,
        BlackListRecordOptJobDeleteDialogComponent,
        BlackListRecordOptJobPopupComponent,
        BlackListRecordOptJobDeletePopupComponent,
    ],
    entryComponents: [
        BlackListRecordOptJobComponent,
        BlackListRecordOptJobDialogComponent,
        BlackListRecordOptJobPopupComponent,
        BlackListRecordOptJobDeleteDialogComponent,
        BlackListRecordOptJobDeletePopupComponent,
    ],
    providers: [
        BlackListRecordOptJobService,
        BlackListRecordOptJobPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OptimizationJobBlackListRecordOptJobModule {}
