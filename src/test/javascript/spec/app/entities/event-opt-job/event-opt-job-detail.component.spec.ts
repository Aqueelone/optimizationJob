/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { OptimizationJobTestModule } from '../../../test.module';
import { EventOptJobDetailComponent } from '../../../../../../main/webapp/app/entities/event-opt-job/event-opt-job-detail.component';
import { EventOptJobService } from '../../../../../../main/webapp/app/entities/event-opt-job/event-opt-job.service';
import { EventOptJob } from '../../../../../../main/webapp/app/entities/event-opt-job/event-opt-job.model';

describe('Component Tests', () => {

    describe('EventOptJob Management Detail Component', () => {
        let comp: EventOptJobDetailComponent;
        let fixture: ComponentFixture<EventOptJobDetailComponent>;
        let service: EventOptJobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [EventOptJobDetailComponent],
                providers: [
                    EventOptJobService
                ]
            })
            .overrideTemplate(EventOptJobDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventOptJobDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventOptJobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EventOptJob(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.event).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
