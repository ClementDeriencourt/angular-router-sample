import {switchMap} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {CrisisCenterService} from '../crisis-center.service';
import {Crisis} from '../crisis';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis$: Observable<Crisis>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CrisisCenterService
  ) {}

  ngOnInit() {
    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getCrisis(params.get('id')))
    );
  }

  gotoCrises(crisis: Crisis) {
    const crisisId = crisis ? crisis.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }
}

/*
  this.router.navigate(['/superheroes', { id: heroId, foo: 'foo' }]);
*/
