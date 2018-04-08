/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OptimizationJobTestModule } from '../../../test.module';
import { CampaignOptJobDialogComponent } from '../../../../../../main/webapp/app/entities/campaign-opt-job/campaign-opt-job-dialog.component';
import { CampaignOptJobService } from '../../../../../../main/webapp/app/entities/campaign-opt-job/campaign-opt-job.service';
import { CampaignOptJob } from '../../../../../../main/webapp/app/entities/campaign-opt-job/campaign-opt-job.model';
import { OptimizationPropsOptJobService } from '../../../../../../main/webapp/app/entities/optimization-props-opt-job';
import { BlackListOptJobService } from '../../../../../../main/webapp/app/entities/black-list-opt-job';

describe('Component Tests', () => {

    describe('CampaignOptJob Management Dialog Component', () => {
        let comp: CampaignOptJobDialogComponent;
        let fixture: ComponentFixture<CampaignOptJobDialogComponent>;
        let service: CampaignOptJobService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [CampaignOptJobDialogComponent],
                providers: [
                    OptimizationPropsOptJobService,
                    BlackListOptJobService,
                    CampaignOptJobService
                ]
            })
            .overrideTemplate(CampaignOptJobDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignOptJobDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignOptJobService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CampaignOptJob(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.campaign = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'campaignListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CampaignOptJob();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.campaign = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'campaignListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
