import { Component, OnDestroy, OnInit } from '@angular/core';

// import { interval, Subscription } from 'rxjs';
import { interval, Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;
  // private firstObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater then 3!'));
        }
        count++;
      }, 1000)
    });

    // customIntervalObservable.pipe(map((data: number) => { return 'Round: ' + (data + 1) }))

    this.firstObsSubscription = customIntervalObservable.pipe(map((data: number) => {
      return 'Round: ' + (data + 1)
    })).subscribe(data => {
      console.log(data)
    }, error => {
      console.log(33, error);
      alert(error.message);
    }, () => {
      console.log('Completed!')
    })
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
