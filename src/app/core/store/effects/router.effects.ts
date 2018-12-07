import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { tap, map } from 'rxjs/operators';

import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromRouter from '../actions/router.actions';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
​
  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(fromRouter.RouterActionTypes.GO),
    map((action: fromRouter.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { ...extras });
    })
  );
​
  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType(fromRouter.RouterActionTypes.BACK),
    tap(() => this.location.back())
  );
​
  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    ofType(fromRouter.RouterActionTypes.FORWARD),
    tap(() => this.location.forward())
  );
}
