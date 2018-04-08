/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OptimizationJobTestModule } from '../../../test.module';
import { BlackListRecordOptJobDialogComponent } from '../../../../../../main/webapp/app/entities/black-list-record-opt-job/black-list-record-opt-job-dialog.component';
import { BlackListRecordOptJobService } from '../../../../../../main/webapp/app/entities/black-list-record-opt-job/black-list-record-opt-job.service';
import { BlackListRecordOptJob } from '../../../../../../main/webapp/app/entities/black-list-record-opt-job/black-list-record-opt-job.model';
import { PublisherOptJobService } from '../../../../../../main/webapp/app/entities/publisher-opt-job';
import { BlackListOptJobService } from '../../../../../../main/webapp/app/entities/black-list-opt-job';

describe('Component Tests', () => {

    describe('BlackListRecordOptJob Management Dialog Component', () => {
        let comp: BlackListRecordOptJobDialogComponent;
        let fixture: ComponentFixture<BlackListRecordOptJobDialogComponent>;
        let service: BlackListRecordOptJobService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [BlackListRecordOptJobDialogComponent],
                providers: [
                    PublisherOptJobService,
                    BlackListOptJobService,
                    BlackListRecordOptJobService
                ]
            })
            .overrideTemplate(BlackListRecordOptJobDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlackListRecordOptJobDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlackListRecordOptJobService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BlackListRecordOptJob(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.blackListRecord = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'blackListRecordListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BlackListRecordOptJob();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.blackListRecord = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'blackListRecordListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
