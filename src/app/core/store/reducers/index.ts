import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromRouterStore from '@ngrx/router-store';
import { environment as env } from '../../../../environments/environment';
import * as fromRouter from './router.reducer';

export interface CoreState {
  router: fromRouterStore.RouterReducerState<fromRouter.RouterState>;
}

export const reducers: ActionReducerMap<CoreState> = {
  router: fromRouterStore.routerReducer,
};

export const metaReducers: MetaReducer<CoreState>[] = !env.production ? [] : [];
