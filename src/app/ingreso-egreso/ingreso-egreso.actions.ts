import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const setItems = createAction(
    '[Ingreso-Egreso] setItems',
    props<{ items: IngresoEgreso[] }>()
);
export const unSetItems = createAction('[Ingreso-Egreso] unSetItems');