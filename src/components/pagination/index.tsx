import React from 'react'
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { PaginationWrapperPropsType } from '../../shared/types';
import './index.css'

export const PaginationWrapper = ({setOffset, totalPages}: PaginationWrapperPropsType) => {
    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setOffset(value*6)
    };
  return (
    <Stack spacing={2}>
      <Pagination count={Math.round(totalPages/6)} color="secondary" page={page} onChange={handleChange} />
    </Stack>
  )
}