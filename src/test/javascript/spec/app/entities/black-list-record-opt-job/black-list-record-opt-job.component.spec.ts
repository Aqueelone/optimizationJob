/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OptimizationJobTestModule } from '../../../test.module';
import { BlackListRecordOptJobComponent } from '../../../../../../main/webapp/app/entities/black-list-record-opt-job/black-list-record-opt-job.component';
import { BlackListRecordOptJobService } from '../../../../../../main/webapp/app/entities/black-list-record-opt-job/black-list-record-opt-job.service';
import { BlackListRecordOptJob } from '../../../../../../main/webapp/app/entities/black-list-record-opt-job/black-list-record-opt-job.model';

describe('Component Tests', () => {

    describe('BlackListRecordOptJob Management Component', () => {
        let comp: BlackListRecordOptJobComponent;
        let fixture: ComponentFixture<BlackListRecordOptJobComponent>;
        let service: BlackListRecordOptJobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [BlackListRecordOptJobComponent],
                providers: [
                    BlackListRecordOptJobService
                ]
            })
            .overrideTemplate(BlackListRecordOptJobComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlackListRecordOptJobComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlackListRecordOptJobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BlackListRecordOptJob(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.blackListRecords[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
