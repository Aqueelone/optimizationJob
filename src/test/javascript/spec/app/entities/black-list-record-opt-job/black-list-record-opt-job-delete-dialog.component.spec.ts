/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OptimizationJobTestModule } from '../../../test.module';
import { BlackListRecordOptJobDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/black-list-record-opt-job/black-list-record-opt-job-delete-dialog.component';
import { BlackListRecordOptJobService } from '../../../../../../main/webapp/app/entities/black-list-record-opt-job/black-list-record-opt-job.service';

describe('Component Tests', () => {

    describe('BlackListRecordOptJob Management Delete Component', () => {
        let comp: BlackListRecordOptJobDeleteDialogComponent;
        let fixture: ComponentFixture<BlackListRecordOptJobDeleteDialogComponent>;
        let service: BlackListRecordOptJobService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [BlackListRecordOptJobDeleteDialogComponent],
                providers: [
                    BlackListRecordOptJobService
                ]
            })
            .overrideTemplate(BlackListRecordOptJobDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlackListRecordOptJobDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlackListRecordOptJobService);
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
