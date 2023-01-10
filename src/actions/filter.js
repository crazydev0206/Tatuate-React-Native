import { APPLY_FILTERS } from './actionTypes';

export const applyFilters = (data) => {
    return dispatch => dispatch( 
        {
            type: APPLY_FILTERS,
            payload: data,
        }
    )
}

