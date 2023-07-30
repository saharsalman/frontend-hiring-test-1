
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { useNavigate } from 'react-router';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import React, {useEffect, useState} from 'react';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { Box, Button, TableCell } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';


import styled from "styled-components";
import { getList } from '../../services/callListApi';
import { AddNotesDialog } from '../../shared/dialog';
import { TableDataType } from '../../shared/types';
import { Navbar } from '../../components/navbar';
import { PaginationWrapper } from '../../components/pagination';
import './index.css'

export const ListTechnologies = () => {
    const limit = 6;
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [tableData, setTableData] = useState<TableDataType>();
    const [filteredData, setFilteredData] = useState<any>();

    console.log('tableData : ', tableData)
    const [age, setAge] = React.useState('all');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
        const filteredTableData = event.target.value === 'all'
        ? tableData?.nodes // Show all data when 'All' is selected
            : tableData?.nodes?.filter((row) => row.is_archived === (event.target.value === 'archive'));
        
        console.log(' filteredTableData : ', filteredTableData);
        setFilteredData(filteredTableData)
    };

    const handleClose = () => {
        setIsDialogOpen(false);
    }

    const handleClick = (id: string) => {
        setIsDialogOpen(true);
        setId(id);
    }

    

    const getFullList = async(token: string, offset: number, limit: number) =>{
        setIsLoading(true);
        const list = await getList(token, offset, limit);
        setTableData(list);
        setIsLoading(false);
    }

    useEffect(() => {
        if (tableData && tableData.nodes) {
            if (age !== 'all') {
                const filteredTableData = age === 'all'
                ? tableData?.nodes // Show all data when 'All' is selected
                    : tableData?.nodes?.filter((row) => row.is_archived === (age === 'archive'));
                    setFilteredData(filteredTableData)
            } else {
                setFilteredData(tableData?.nodes)
            }
        }
    }, [tableData])
    useEffect(()=>{
        const token = localStorage.getItem('jwtToken');
        if(token){
            getFullList(token, offset ,limit)
        }
        else{
            navigate('/')
        }
    },[offset,limit])

    return (
        <>
            <Box >
                <Navbar />
                <Box sx={{
                    display: 'flex',
                    gap: '25px',
                    padding: '30px',
                    flexDirection: 'column'
                }}>
                    <Typography sx={{
                        textAlign: 'left',
                        fontFamily: 'AvenirLTStd-black',
                        fontSize:'25px'
                    }}>Turning Technologies Frontend Test</Typography>
                    <Stack sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end'
                        }}>
                        <Typography>Filter by: </Typography>
                        <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={age}
                                onChange={handleChange}
                                placeholder="status"
                                >
                                <MenuItem value='all'>All</MenuItem>
                                <MenuItem value='archive'>Archive</MenuItem>
                                <MenuItem value='unarchived'>Unarchived</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    {isLoading && 
                        <Stack sx={{
                            justifyContent: 'center',
                            alignItems: 'center'                        
                        }}>
                             <CircularProgress sx={{color:'blue'}} size={50} className='loader'/>
                        </Stack>
                    }
                    {!isLoading &&
                    <Box className='container'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table" className="table-wrapper">
                                <TableHead className='head'>
                                <TableRow>
                                    <TableCell className='table-heading'>CALL TYPE</TableCell>
                                    <TableCell className='table-heading'>DIRECTION</TableCell>
                                    <TableCell className='table-heading'>DURATION</TableCell>
                                    <TableCell className='table-heading'>FROM</TableCell>
                                    <TableCell className='table-heading'>TO</TableCell>
                                    <TableCell className='table-heading'>VIA</TableCell>
                                    <TableCell className='table-heading'>CREATED AT</TableCell>
                                    <TableCell className='table-heading'>STATUS</TableCell>
                                    <TableCell className='table-heading'>ACTIONS</TableCell>
                                </TableRow>
                                </TableHead>

                                <TableBody className='body'>
                                    { filteredData && filteredData?.map((row: any) => (
                                        <TableRow key={row.id}>
                                            <TableCell className={row.call_type}>
                                                {row.call_type === 'voicemail' ? 'Voice Mail': row.call_type}
                                            </TableCell>
                                            <TableCell className='direction'>
                                                {row.direction}
                                            </TableCell>
                                            <TableCell >
                                                <Stack sx={{
                                                        flexDirection: 'row',
                                                        gap: '3px'
                                                    }}>
                                                    <span>{Math.floor(row.duration / 60)} minutes </span>
                                                    <span>{row.duration % 60} seconds</span>
                                                </Stack>
                                                <span className='total-seconds'>{row.duration} seconds</span>
                                            </TableCell>
                                            <TableCell >{row.from}</TableCell>
                                            <TableCell >{row.to}</TableCell>
                                            <TableCell >{row.via}</TableCell>
                                            <TableCell >{row.created_at}</TableCell>
                                            <TableCell >
                                                <Stack sx={{
                                                    backgroundColor: row.is_archived ? '#edfbfa' : '#eeeeee',
                                                    color: row.is_archived ? '#24cab9' : '#727272',
                                                    padding: '8px',
                                                    borderRadius: '8px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    {row.is_archived ? 'Archived':'Unarchive'}
                                                </Stack>
                                            </TableCell>
                                            <TableCell >
                                                <Button className='add-note-btn' onClick={() => handleClick(row.id)} id={row.id}>
                                                    Add Note
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </Box>
                    }
                    <Box className='pagination'>
                        <PaginationWrapper setOffset={setOffset} totalPages={tableData?.totalCount || 0}/>
                    </Box>
                    <AddNotesDialog isDialogOpen={isDialogOpen} onClose={handleClose} id={id} />
                </Box>
            </Box>
        </>
    )
}