import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay, mergeMap
} from 'rxjs/operators';
import { merge, fromEvent, Observable, concat } from 'rxjs';
import { Lesson } from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { searchLessons } from '../../../server/search-lessons.route';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId: string;

    course$: Observable<Course>;

    lessons$: Observable<Lesson[]>;

    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {
        this.courseId = this.route.snapshot.params['id'];
        this.course$ = createHttpObservable(`/api/courses/${this.courseId}`);
    }

    /**
     * display lessons according to search term. 
     * if not display all course lessons
     */
    ngAfterViewInit() {
        
        this.lessons$ = fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
            map(event => event['target'].value),
            startWith(''),
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(search => this.loadLessons(search))
            );
            

    }

    /** loads lessons according the search term
     * @param search a string with defaults value of empty
     */
    loadLessons(search = ''): Observable<Lesson[]> {
        return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
            .pipe(map(res => Object.values(res['payload'])));
    }


}
