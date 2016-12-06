import * as actionTypes from './actionTypes';

export const add = (unit) => ({
  meta: {remote: true},
  type: actionTypes.ADD,
  unit
});

export const update = (unit) => ({
  meta: {remote: true},
  type: actionTypes.EDIT,
  unit
});

export const del = (id) => ({
  meta: {remote: true},
  type: actionTypes.DELETE,
  id
});

export const added = (unit) => ({
  type: actionTypes.ADDED,
  unit
});

export const updated = (unit) => ({
  type: actionTypes.EDITED,
  unit
});

export const deleted = (id) => ({
  type: actionTypes.DELETED,
  id
});