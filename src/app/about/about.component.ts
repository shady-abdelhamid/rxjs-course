import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { createHttpObservable } from '../common/util';
import { noop } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {
        // const click$ = fromEvent(document, 'click');

        // click$.subscribe(evt => console.log(evt));

        const subscribtion = createHttpObservable('/api/courses')
          .subscribe(console.log);
        subscribtion.unsubscribe(); 
    }
}
