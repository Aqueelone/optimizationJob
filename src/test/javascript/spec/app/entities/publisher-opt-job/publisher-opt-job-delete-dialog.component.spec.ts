/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OptimizationJobTestModule } from '../../../test.module';
import { PublisherOptJobDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/publisher-opt-job/publisher-opt-job-delete-dialog.component';
import { PublisherOptJobService } from '../../../../../../main/webapp/app/entities/publisher-opt-job/publisher-opt-job.service';

describe('Component Tests', () => {

    describe('PublisherOptJob Management Delete Component', () => {
        let comp: PublisherOptJobDeleteDialogComponent;
        let fixture: ComponentFixture<PublisherOptJobDeleteDialogComponent>;
        let service: PublisherOptJobService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [PublisherOptJobDeleteDialogComponent],
                providers: [
                    PublisherOptJobService
                ]
            })
            .overrideTemplate(PublisherOptJobDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PublisherOptJobDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PublisherOptJobService);
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
