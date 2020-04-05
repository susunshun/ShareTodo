import React from 'react'
import FilterLink from '../containers/FilterLink'
import {VisibilityFilters} from '../actions'
import styled from "styled-components";

const Filter = () => (
  <Root>
    <span>Show: </span>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
  </Root>
);

export const Root = styled.div`
    padding: 5px 10px 10px 10px;
`;

export default Filter