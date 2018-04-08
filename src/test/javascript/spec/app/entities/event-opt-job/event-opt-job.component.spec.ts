/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OptimizationJobTestModule } from '../../../test.module';
import { EventOptJobComponent } from '../../../../../../main/webapp/app/entities/event-opt-job/event-opt-job.component';
import { EventOptJobService } from '../../../../../../main/webapp/app/entities/event-opt-job/event-opt-job.service';
import { EventOptJob } from '../../../../../../main/webapp/app/entities/event-opt-job/event-opt-job.model';

describe('Component Tests', () => {

    describe('EventOptJob Management Component', () => {
        let comp: EventOptJobComponent;
        let fixture: ComponentFixture<EventOptJobComponent>;
        let service: EventOptJobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [EventOptJobComponent],
                providers: [
                    EventOptJobService
                ]
            })
            .overrideTemplate(EventOptJobComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventOptJobComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventOptJobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EventOptJob(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.events[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
