import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, Observable, of, timer, noop, throwError} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap, finalize} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {
        const courses$: Observable<Course[]> = createHttpObservable('/api/courses')
        .pipe(
            catchError(err => {
                console.log('error occurred', err);
                return throwError(err);
            }),
            tap(() => console.log('http request executed')),
            finalize(() => {
                console.log('Finalize executed...')
            }),
            map( res => Object.values(res['payload'])),
            shareReplay(),
        );

        this.beginnerCourses$ = courses$
            .pipe(
                map(courses => courses
                    .filter(course => course.category == 'BEGINNER'))
            );
        this.advancedCourses$ = courses$
            .pipe(
                map(courses => courses
                    .filter(course => course.category == 'ADVANCED'))
            );
    }

}
