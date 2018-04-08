/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OptimizationJobTestModule } from '../../../test.module';
import { OptimizationPropsOptJobDialogComponent } from '../../../../../../main/webapp/app/entities/optimization-props-opt-job/optimization-props-opt-job-dialog.component';
import { OptimizationPropsOptJobService } from '../../../../../../main/webapp/app/entities/optimization-props-opt-job/optimization-props-opt-job.service';
import { OptimizationPropsOptJob } from '../../../../../../main/webapp/app/entities/optimization-props-opt-job/optimization-props-opt-job.model';

describe('Component Tests', () => {

    describe('OptimizationPropsOptJob Management Dialog Component', () => {
        let comp: OptimizationPropsOptJobDialogComponent;
        let fixture: ComponentFixture<OptimizationPropsOptJobDialogComponent>;
        let service: OptimizationPropsOptJobService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [OptimizationPropsOptJobDialogComponent],
                providers: [
                    OptimizationPropsOptJobService
                ]
            })
            .overrideTemplate(OptimizationPropsOptJobDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OptimizationPropsOptJobDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OptimizationPropsOptJobService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OptimizationPropsOptJob(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.optimizationProps = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'optimizationPropsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OptimizationPropsOptJob();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.optimizationProps = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'optimizationPropsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
