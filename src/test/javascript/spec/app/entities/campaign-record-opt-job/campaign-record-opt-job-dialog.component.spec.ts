/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OptimizationJobTestModule } from '../../../test.module';
import { CampaignRecordOptJobDialogComponent } from '../../../../../../main/webapp/app/entities/campaign-record-opt-job/campaign-record-opt-job-dialog.component';
import { CampaignRecordOptJobService } from '../../../../../../main/webapp/app/entities/campaign-record-opt-job/campaign-record-opt-job.service';
import { CampaignRecordOptJob } from '../../../../../../main/webapp/app/entities/campaign-record-opt-job/campaign-record-opt-job.model';
import { PublisherOptJobService } from '../../../../../../main/webapp/app/entities/publisher-opt-job';
import { CampaignOptJobService } from '../../../../../../main/webapp/app/entities/campaign-opt-job';

describe('Component Tests', () => {

    describe('CampaignRecordOptJob Management Dialog Component', () => {
        let comp: CampaignRecordOptJobDialogComponent;
        let fixture: ComponentFixture<CampaignRecordOptJobDialogComponent>;
        let service: CampaignRecordOptJobService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [CampaignRecordOptJobDialogComponent],
                providers: [
                    PublisherOptJobService,
                    CampaignOptJobService,
                    CampaignRecordOptJobService
                ]
            })
            .overrideTemplate(CampaignRecordOptJobDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignRecordOptJobDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignRecordOptJobService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CampaignRecordOptJob(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.campaignRecord = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'campaignRecordListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CampaignRecordOptJob();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.campaignRecord = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'campaignRecordListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
