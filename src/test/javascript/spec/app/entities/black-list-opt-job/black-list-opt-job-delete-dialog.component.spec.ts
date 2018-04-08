/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OptimizationJobTestModule } from '../../../test.module';
import { BlackListOptJobDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/black-list-opt-job/black-list-opt-job-delete-dialog.component';
import { BlackListOptJobService } from '../../../../../../main/webapp/app/entities/black-list-opt-job/black-list-opt-job.service';

describe('Component Tests', () => {

    describe('BlackListOptJob Management Delete Component', () => {
        let comp: BlackListOptJobDeleteDialogComponent;
        let fixture: ComponentFixture<BlackListOptJobDeleteDialogComponent>;
        let service: BlackListOptJobService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [BlackListOptJobDeleteDialogComponent],
                providers: [
                    BlackListOptJobService
                ]
            })
            .overrideTemplate(BlackListOptJobDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlackListOptJobDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlackListOptJobService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
