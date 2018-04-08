/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { OptimizationJobTestModule } from '../../../test.module';
import { CampaignOptJobDetailComponent } from '../../../../../../main/webapp/app/entities/campaign-opt-job/campaign-opt-job-detail.component';
import { CampaignOptJobService } from '../../../../../../main/webapp/app/entities/campaign-opt-job/campaign-opt-job.service';
import { CampaignOptJob } from '../../../../../../main/webapp/app/entities/campaign-opt-job/campaign-opt-job.model';

describe('Component Tests', () => {

    describe('CampaignOptJob Management Detail Component', () => {
        let comp: CampaignOptJobDetailComponent;
        let fixture: ComponentFixture<CampaignOptJobDetailComponent>;
        let service: CampaignOptJobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [CampaignOptJobDetailComponent],
                providers: [
                    CampaignOptJobService
                ]
            })
            .overrideTemplate(CampaignOptJobDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignOptJobDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignOptJobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CampaignOptJob(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.campaign).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
