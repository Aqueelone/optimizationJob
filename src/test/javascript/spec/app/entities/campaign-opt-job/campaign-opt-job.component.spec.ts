/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OptimizationJobTestModule } from '../../../test.module';
import { CampaignOptJobComponent } from '../../../../../../main/webapp/app/entities/campaign-opt-job/campaign-opt-job.component';
import { CampaignOptJobService } from '../../../../../../main/webapp/app/entities/campaign-opt-job/campaign-opt-job.service';
import { CampaignOptJob } from '../../../../../../main/webapp/app/entities/campaign-opt-job/campaign-opt-job.model';

describe('Component Tests', () => {

    describe('CampaignOptJob Management Component', () => {
        let comp: CampaignOptJobComponent;
        let fixture: ComponentFixture<CampaignOptJobComponent>;
        let service: CampaignOptJobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [CampaignOptJobComponent],
                providers: [
                    CampaignOptJobService
                ]
            })
            .overrideTemplate(CampaignOptJobComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampaignOptJobComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignOptJobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CampaignOptJob(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.campaigns[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
