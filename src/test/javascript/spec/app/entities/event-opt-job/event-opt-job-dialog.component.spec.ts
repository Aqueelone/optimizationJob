/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OptimizationJobTestModule } from '../../../test.module';
import { EventOptJobDialogComponent } from '../../../../../../main/webapp/app/entities/event-opt-job/event-opt-job-dialog.component';
import { EventOptJobService } from '../../../../../../main/webapp/app/entities/event-opt-job/event-opt-job.service';
import { EventOptJob } from '../../../../../../main/webapp/app/entities/event-opt-job/event-opt-job.model';
import { PublisherOptJobService } from '../../../../../../main/webapp/app/entities/publisher-opt-job';
import { CampaignOptJobService } from '../../../../../../main/webapp/app/entities/campaign-opt-job';

describe('Component Tests', () => {

    describe('EventOptJob Management Dialog Component', () => {
        let comp: EventOptJobDialogComponent;
        let fixture: ComponentFixture<EventOptJobDialogComponent>;
        let service: EventOptJobService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [EventOptJobDialogComponent],
                providers: [
                    PublisherOptJobService,
                    CampaignOptJobService,
                    EventOptJobService
                ]
            })
            .overrideTemplate(EventOptJobDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventOptJobDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventOptJobService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EventOptJob(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.event = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'eventListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EventOptJob();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.event = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'eventListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
