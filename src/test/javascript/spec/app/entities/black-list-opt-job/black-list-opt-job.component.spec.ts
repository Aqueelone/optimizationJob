/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OptimizationJobTestModule } from '../../../test.module';
import { BlackListOptJobComponent } from '../../../../../../main/webapp/app/entities/black-list-opt-job/black-list-opt-job.component';
import { BlackListOptJobService } from '../../../../../../main/webapp/app/entities/black-list-opt-job/black-list-opt-job.service';
import { BlackListOptJob } from '../../../../../../main/webapp/app/entities/black-list-opt-job/black-list-opt-job.model';

describe('Component Tests', () => {

    describe('BlackListOptJob Management Component', () => {
        let comp: BlackListOptJobComponent;
        let fixture: ComponentFixture<BlackListOptJobComponent>;
        let service: BlackListOptJobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OptimizationJobTestModule],
                declarations: [BlackListOptJobComponent],
                providers: [
                    BlackListOptJobService
                ]
            })
            .overrideTemplate(BlackListOptJobComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlackListOptJobComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlackListOptJobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BlackListOptJob(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.blackLists[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
