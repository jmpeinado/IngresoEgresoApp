import { createReducer, on, props } from '@ngrx/store';
import * as actions from './auth.actions';
import { Usuario } from '../models/usuario.model';

export interface State {
    user: Usuario; 
}

export const initialState: State = {
    user: null
}

export const authReducer = createReducer(initialState,

    on(actions.setUser, (state, props) => ({ ...state, user: { ...props.user } })),
    on(actions.unSetUser, state => ({ ...state, user: null }))

);
