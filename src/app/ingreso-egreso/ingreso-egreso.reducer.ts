import { createReducer, on, props } from '@ngrx/store';
import { setItems, unSetItems } from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgreso[]; 
}

export interface AppStateWithIngresos extends AppState {
    ingresosEgresos: State
}

export const initialState: State = {
   items: []
}

export const ingresoEgresoReducer = createReducer(initialState,

    //on( setItems, (state, props) => ({ ...state, items: [...props.items] }) ), // ORIGINAL
    on( setItems, (state, {items}) => ({ ...state, items: [...items] }) ), // CON DESESTRUCTURACION DEL PROPS
    on( unSetItems, state => ({ ...state, items: [] }) )

);
