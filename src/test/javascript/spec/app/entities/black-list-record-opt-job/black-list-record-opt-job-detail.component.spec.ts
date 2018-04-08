/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { OptimizationJobTestModule } from '../../../test.module';
import { BlackListRecordOptJobDetailComponent } from '../../../../../../main/webapp/app/entities/black-list-record-opt-job/black-list-record-opt-job-detail.component';
import { BlackListRecordOptJobService } from '../../../../../../main/webapp/app/entities/black-list-record-opt-job/black-list-record-opt-job.service';
import { BlackListRecordOptJob } from '../../../../../../main/webapp/app/entities/black-list-record-opt-job/black-list-record-opt-job.model';

describe('Component Tests', () => {

    describe('BlackListRecordOptJob Management Detail Component', () => {
        let comp: BlackListRecordOptJobDetailComponent;
        let fixture: ComponentFixture<BlackListRecordOptJobDetailComponent>;
        let service: BlackListRecordOptJobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [BlackListRecordOptJobDetailComponent],
                providers: [
                    BlackListRecordOptJobService
                ]
            })
            .overrideTemplate(BlackListRecordOptJobDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlackListRecordOptJobDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlackListRecordOptJobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BlackListRecordOptJob(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.blackListRecord).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
