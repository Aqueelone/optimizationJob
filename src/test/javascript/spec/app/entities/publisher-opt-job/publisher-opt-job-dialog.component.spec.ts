/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OptimizationJobTestModule } from '../../../test.module';
import { PublisherOptJobDialogComponent } from '../../../../../../main/webapp/app/entities/publisher-opt-job/publisher-opt-job-dialog.component';
import { PublisherOptJobService } from '../../../../../../main/webapp/app/entities/publisher-opt-job/publisher-opt-job.service';
import { PublisherOptJob } from '../../../../../../main/webapp/app/entities/publisher-opt-job/publisher-opt-job.model';

describe('Component Tests', () => {

    describe('PublisherOptJob Management Dialog Component', () => {
        let comp: PublisherOptJobDialogComponent;
        let fixture: ComponentFixture<PublisherOptJobDialogComponent>;
        let service: PublisherOptJobService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [PublisherOptJobDialogComponent],
                providers: [
                    PublisherOptJobService
                ]
            })
            .overrideTemplate(PublisherOptJobDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PublisherOptJobDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PublisherOptJobService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PublisherOptJob(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.publisher = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'publisherListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PublisherOptJob();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.publisher = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'publisherListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
