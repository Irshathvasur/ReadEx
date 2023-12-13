import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterLink, RouterOutlet } from '@angular/router';
import {
  animation, trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('main <=> search', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: 'translateY(0%)'
          })
        ]),
        query(':enter', [
          style({ transform: 'translateY(100%)', opacity: 0 })
        ], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            animate('300ms ease-in', style({ transform: 'translateY(0%)', opacity: 1 }))
          ], { optional: true }),
        ]),
      ]),
    ])
  ]
})
export class AppComponent {
  title = 'ReadEx';
  constructor(private contexts: ChildrenOutletContexts) { }
  getRouteAnimationData() {
    let data = this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    return data;
  }
}
