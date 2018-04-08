/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OptimizationJobTestModule } from '../../../test.module';
import { PublisherOptJobComponent } from '../../../../../../main/webapp/app/entities/publisher-opt-job/publisher-opt-job.component';
import { PublisherOptJobService } from '../../../../../../main/webapp/app/entities/publisher-opt-job/publisher-opt-job.service';
import { PublisherOptJob } from '../../../../../../main/webapp/app/entities/publisher-opt-job/publisher-opt-job.model';

describe('Component Tests', () => {

    describe('PublisherOptJob Management Component', () => {
        let comp: PublisherOptJobComponent;
        let fixture: ComponentFixture<PublisherOptJobComponent>;
        let service: PublisherOptJobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [PublisherOptJobComponent],
                providers: [
                    PublisherOptJobService
                ]
            })
            .overrideTemplate(PublisherOptJobComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PublisherOptJobComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PublisherOptJobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PublisherOptJob(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.publishers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
