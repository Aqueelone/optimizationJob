/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OptimizationJobTestModule } from '../../../test.module';
import { OptimizationPropsOptJobComponent } from '../../../../../../main/webapp/app/entities/optimization-props-opt-job/optimization-props-opt-job.component';
import { OptimizationPropsOptJobService } from '../../../../../../main/webapp/app/entities/optimization-props-opt-job/optimization-props-opt-job.service';
import { OptimizationPropsOptJob } from '../../../../../../main/webapp/app/entities/optimization-props-opt-job/optimization-props-opt-job.model';

describe('Component Tests', () => {

    describe('OptimizationPropsOptJob Management Component', () => {
        let comp: OptimizationPropsOptJobComponent;
        let fixture: ComponentFixture<OptimizationPropsOptJobComponent>;
        let service: OptimizationPropsOptJobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [OptimizationPropsOptJobComponent],
                providers: [
                    OptimizationPropsOptJobService
                ]
            })
            .overrideTemplate(OptimizationPropsOptJobComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OptimizationPropsOptJobComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OptimizationPropsOptJobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OptimizationPropsOptJob(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.optimizationProps[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
