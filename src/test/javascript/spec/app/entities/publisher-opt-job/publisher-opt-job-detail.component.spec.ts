/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { OptimizationJobTestModule } from '../../../test.module';
import { PublisherOptJobDetailComponent } from '../../../../../../main/webapp/app/entities/publisher-opt-job/publisher-opt-job-detail.component';
import { PublisherOptJobService } from '../../../../../../main/webapp/app/entities/publisher-opt-job/publisher-opt-job.service';
import { PublisherOptJob } from '../../../../../../main/webapp/app/entities/publisher-opt-job/publisher-opt-job.model';

describe('Component Tests', () => {

    describe('PublisherOptJob Management Detail Component', () => {
        let comp: PublisherOptJobDetailComponent;
        let fixture: ComponentFixture<PublisherOptJobDetailComponent>;
        let service: PublisherOptJobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [PublisherOptJobDetailComponent],
                providers: [
                    PublisherOptJobService
                ]
            })
            .overrideTemplate(PublisherOptJobDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PublisherOptJobDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PublisherOptJobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PublisherOptJob(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.publisher).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
