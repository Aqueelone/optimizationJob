/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OptimizationJobTestModule } from '../../../test.module';
import { CampaignRecordOptJobComponent } from '../../../../../../main/webapp/app/entities/campaign-record-opt-job/campaign-record-opt-job.component';
import { CampaignRecordOptJobService } from '../../../../../../main/webapp/app/entities/campaign-record-opt-job/campaign-record-opt-job.service';
import { CampaignRecordOptJob } from '../../../../../../main/webapp/app/entities/campaign-record-opt-job/campaign-record-opt-job.model';

describe('Component Tests', () => {

    describe('CampaignRecordOptJob Management Component', () => {
        let comp: CampaignRecordOptJobComponent;
        let fixture: ComponentFixture<CampaignRecordOptJobComponent>;
        let service: CampaignRecordOptJobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [CampaignRecordOptJobComponent],
                providers: [
                    CampaignRecordOptJobService
                ]
            })
            .overrideTemplate(CampaignRecordOptJobComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignRecordOptJobComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignRecordOptJobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CampaignRecordOptJob(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.campaignRecords[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
