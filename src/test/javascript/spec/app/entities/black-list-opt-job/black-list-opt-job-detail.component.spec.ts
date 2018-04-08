/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { OptimizationJobTestModule } from '../../../test.module';
import { BlackListOptJobDetailComponent } from '../../../../../../main/webapp/app/entities/black-list-opt-job/black-list-opt-job-detail.component';
import { BlackListOptJobService } from '../../../../../../main/webapp/app/entities/black-list-opt-job/black-list-opt-job.service';
import { BlackListOptJob } from '../../../../../../main/webapp/app/entities/black-list-opt-job/black-list-opt-job.model';

describe('Component Tests', () => {

    describe('BlackListOptJob Management Detail Component', () => {
        let comp: BlackListOptJobDetailComponent;
        let fixture: ComponentFixture<BlackListOptJobDetailComponent>;
        let service: BlackListOptJobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [BlackListOptJobDetailComponent],
                providers: [
                    BlackListOptJobService
                ]
            })
            .overrideTemplate(BlackListOptJobDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlackListOptJobDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlackListOptJobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BlackListOptJob(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.blackList).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
