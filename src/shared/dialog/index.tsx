import Modal from '@mui/material/Modal';
import Textarea from '@mui/joy/Textarea';
import React,{useEffect,useState} from 'react'
import { CircularProgress, Stack } from '@mui/material';
import {Box,Button, Divider} from '@mui/material';
import Typography from '@mui/material/Typography';
import styled from "styled-components";
import { addNote, getListById } from '../../services/callListApi';
import { AddNotesDialogPropsType, CallListDataType } from '../types';
import './index.css';
import CloseIcon from '@mui/icons-material/Close';

export const AddNotesDialog = ({isDialogOpen, onClose, id}: AddNotesDialogPropsType) => {
    const [note, setNote] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [technology, setTechnology] = useState<CallListDataType>();

    const handleSave = async() =>{
        setIsLoading(true);
        await addNote(localStorage.getItem('jwtToken') || '', id, note || '');
        const data = await getListById(localStorage.getItem('jwtToken') || '', id);
        setTechnology({...data});
        setNote('');
        setIsLoading(false);
    }

    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      minHeight:400,
      bgcolor: 'background.paper',
      border: 'none',
      borderRadius: '8px',
      boxShadow: 24,
      overflow: 'overlay'
    };

      const getTechnology = async(token: string) =>{
            setIsLoading(true);
            const data = await getListById(token, id)
            setTechnology({...data});
            setNote('');
            setIsLoading(false);
      }

      useEffect(()=>{
        console.log('id',id);
        const token = localStorage.getItem('jwtToken') || '';
        getTechnology(token);
      },[id])

  return (
      <Modal
        open={isDialogOpen || false}
        onClose={onClose}
      >
        <Box sx={style}>
        {isLoading &&
            <Stack sx={{
              justifyContent: 'center',
            alignItems: 'center',
              height: '400px'
          }}>
                <CircularProgress sx={{color:'blue'}} size={50} />
          </Stack>}
          {!isLoading &&
          <>
          <Box className='header'>
            <Stack>
            <Typography className='title'>
                  Add Notes
              </Typography>
              <Typography className='call-id'>
                  Call ID {technology?.id}
              </Typography>
            </Stack>
            <Stack>
              <CloseIcon onClick={()=>onClose()} fontSize='small' sx={{ color:'blue', cursor:'pointer'}}/>
            </Stack>
            </Box>
            <Divider/>
            <Box className='content'>
            <Stack direction='row' spacing='25px'>
              <Stack sx={{ flexDirection: 'column !important'}} >
                <Typography sx={{
                  fontFamily: 'AvenirLTStd-black'
                }}>Call Type</Typography>
                <Typography sx={{
                  fontFamily: 'AvenirLTStd-black'
                }}>Duration</Typography>
                <Typography sx={{
                  fontFamily: 'AvenirLTStd-black'
                }}>From</Typography>
                <Typography sx={{
                  fontFamily: 'AvenirLTStd-black'
                }}>To</Typography>
                <Typography sx={{
                  fontFamily: 'AvenirLTStd-black'
                }}>Via</Typography>
              </Stack>
              <Stack sx={{ flexDirection: 'column !important'}} >
                <Typography sx={{textTransform: 'capitalize'}} className={technology?.call_type}>{technology?.call_type === 'voicemail' ? 'Voice Mail' : technology?.call_type }</Typography>
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {technology?.duration && (
                                      <Stack sx={{
                                        flexDirection: 'row',
                                        gap: '3px'
                                    }}>
                                    <span>{Math.floor(technology?.duration / 60)} minutes </span>
                                    <span>{technology?.duration % 60} seconds</span>
                                </Stack>
                  )}</Typography>
                <Typography>{technology?.from}</Typography>
                <Typography>{technology?.to}</Typography>
                <Typography>{technology?.via}</Typography>
              </Stack>
            </Stack>
            <Stack sx={{marginTop: '10px'}} spacing={1}>
              <Stack sx={{    alignItems: 'flex-start'}}>Notes</Stack>
              {technology?.notes && technology?.notes?.length > 0 && (
                              <Stack>
                              <ul>
                                  {technology?.notes?.map((note:any)=>{
                                      return (<li key={note?.id}>{note?.content}</li>)
                                  })}
                              </ul>
                            </Stack>
              )}
              <Textarea minRows={3} className='text-area'
                value={note} onChange={e => setNote(e.target.value)} placeholder="Add Notes" variant="outlined" />
            </Stack>
            </Box>
          <Divider />
          <Stack  sx={{marginTop: '20px', padding:'20px'}}> 
            <Button disabled={!note} className='save-button' variant="outlined" onClick={handleSave}>Save</Button>
          </Stack>
            </>
          }
        </Box>
      </Modal>
  )
}