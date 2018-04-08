/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { OptimizationJobTestModule } from '../../../test.module';
import { OptimizationPropsOptJobDetailComponent } from '../../../../../../main/webapp/app/entities/optimization-props-opt-job/optimization-props-opt-job-detail.component';
import { OptimizationPropsOptJobService } from '../../../../../../main/webapp/app/entities/optimization-props-opt-job/optimization-props-opt-job.service';
import { OptimizationPropsOptJob } from '../../../../../../main/webapp/app/entities/optimization-props-opt-job/optimization-props-opt-job.model';

describe('Component Tests', () => {

    describe('OptimizationPropsOptJob Management Detail Component', () => {
        let comp: OptimizationPropsOptJobDetailComponent;
        let fixture: ComponentFixture<OptimizationPropsOptJobDetailComponent>;
        let service: OptimizationPropsOptJobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [OptimizationPropsOptJobDetailComponent],
                providers: [
                    OptimizationPropsOptJobService
                ]
            })
            .overrideTemplate(OptimizationPropsOptJobDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OptimizationPropsOptJobDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OptimizationPropsOptJobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OptimizationPropsOptJob(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.optimizationProps).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
