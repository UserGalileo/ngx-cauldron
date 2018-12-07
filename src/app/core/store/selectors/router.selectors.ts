import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { RouterState } from '../reducers/router.reducer';

export const selectRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterState>>('router');

export const selectRouterUrl = createSelector(
  selectRouterState,
  (state) => state ? state.state.url : null
);

export const selectRouterParams = createSelector(
  selectRouterState,
  (state) => state ? state.state.params : null
);

export const selectRouterQueryParams = createSelector(
  selectRouterState,
  (state) => state ? state.state.queryParams : null
);
