import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { createHttpObservable } from '../common/util';
import { noop } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {
        // const click$ = fromEvent(document, 'click');

        // click$.subscribe(evt => console.log(evt));

        const http$ = createHttpObservable('/api/courses');

        http$.subscribe(
            courses => console.log(courses),
            noop,
            () => console.log('completed')
            );

    }
}
