import { DataGrid, GridCheckCircleIcon, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import useUsers from '../useUsers';
import { Avatar, Chip, IconButton, InputAdornment, Tooltip, Typography } from '@mui/material';
import { HowToReg, Receipt} from '@mui/icons-material';
import UserSearch from './UserSearch';
import { format } from "date-fns"
import { differenceInCalendarDays } from 'date-fns';


// const paginationModel = { page: 0, pageSize: 100 };

export default function UserListTab() {

  const columns: GridColDef<UsersType>[] = [
    {
      field: 'picUrl', headerName: 'Image', width: 70
      , renderCell: ((params) => {
        return <>
          <div className=" flex w-full p-2 justify-center">
            <Avatar
              src={params.row.picUrl!}
              alt={params.row.name}
              className='w-8 h-8 rounded-full'
            />
          </div>
        </>
      })
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'hasAttendanceToday', headerName: 'Attendance', width: 110 },
    { field: 'phoneNumber', headerName: 'Phone', width: 110 },
    {
      field: 'presonalTrainer', headerName: 'Trainer', width: 80, renderCell: ((params) => {
        return renderCheck(params.row.presonalTrainer)
      })
    },
    {
      field: 'cardio', headerName: 'Cardio', width: 80, renderCell: ((params) => {
        return renderCheck(params.row.cardio)
      })
    },
    {
      field: 'nextPayment', headerName: 'Next Payment', width: 130
      , renderCell: ((params) => {
        return <>{format(new Date(params.row.nextPayment!), 'MMMM do, yyyy')}</>
      })
    },
    {
      field: 'none', headerName: 'Fee Status', width: 140,
      renderCell: ((param) => {

        const daysRemaining = differenceInCalendarDays(new Date(param.row.nextPayment!), new Date())
        const THRESHOLD = 7
        console.log("data:", { daysRemaining: daysRemaining <= THRESHOLD });

        return <>
          <div className="w-full -flex -justify-center">
            {daysRemaining > THRESHOLD && <Chip
              variant='filled'
              label={`${daysRemaining} days left`}
              size='medium'
              className='bg-green-600 text-white mx-auto w-[7rem] shadow-2xl'
              clickable={true}
            />}

            {0 < daysRemaining && daysRemaining <= THRESHOLD ? <Chip
              variant='filled'
              label={`${daysRemaining} days left`}
              size='medium'
              className='bg-yellow-500 text-white mx-auto w-[7rem] shadow-2xl'
              clickable={true}
            /> : ""}

            {daysRemaining <= 0 && <Chip
              variant='filled'
              label={`Due ${daysRemaining} days`}
              size='medium'
              className='bg-red-600 text-white mx-auto w-[7rem] shadow-2xl'
              clickable={true}
            />}
          </div>

        </>
      }
      )
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 200,
      renderCell: ((params) => {
        console.log({ data: params.row.id });
        const daysRemaining = differenceInCalendarDays(new Date(params.row.nextPayment!), new Date())

        return <div className='w-[10rem] flex items-center'>
          {/* <Tooltip
            title="To Edit User"
          >
            <IconButton>
              <Edit className='text-blue-700' />
            </IconButton>
          </Tooltip> */}

          <Tooltip
            title="Delete User"
          >

            <PaymentModal
              userId={params.row.id!}
              userName={params.row.name}
              picUrl={params.row.picUrl!}
              nextPayment={params.row.nextPayment!.toString()}
              daysRemaining={daysRemaining}
            >
              <Receipt className='text-blue-600' />
            </PaymentModal>

          </Tooltip>


          <Tooltip
            title="Mark Todays attendance"
          >
            <AttendanceModal userId={params.row.id!} userName={params.row.name} >
              <IconButton className={`${params.row.hasAttendanceToday == "Present" ? "hidden" : ""}`}>
                <HowToReg className='text-green-700' />
              </IconButton>
            </AttendanceModal>
          </Tooltip>

        </div>
      }
      )
    }
  ];
  const { getUsers, isLoading } = useUsers()
  // setSearchParams({ page: '3', filter: 'archived' });
  return (

    <>

      <Paper
        className='w-[97%] p-4 hide-scrollbar'
      >
        <UserSearch />
        <div className="w-[full] hide-scrollbar">
          {getUsers?.length === 0 && !isLoading && <p>No users found</p>}
          {isLoading ? <DataGridSkeleton /> : <DataGrid
            className='overflow-auto hide-scrollbar'
            rows={getUsers}
            columns={columns}
            // initialState={{ pagination: { paginationModel } }}
            // pageSizeOptions={[5, 10]}
            // checkboxSelection
            sx={{
              border: 0,
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5', // optional: gives a nice background
                fontSize: '1rem',         // BIG
                fontWeight: 'bold',         // BOLD
                color: '#333',              // optional: darker text
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',         // Bolder titles
              },
            }}
          />}
        </div>
      </Paper>
    </>
  );
}


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import { UsersType } from '../Users.type';
import { useAttendence } from '../../Attendence/useAttendance';

import TextField from '@mui/material/TextField';
import { useCreateInvoiceForm } from '../../Invoice/useInvoice';
import DataGridSkeleton from '../../_shared/UI/DataGridSkeleton';

interface IPaymentModal {
  userId: string;
  userName: string;
  picUrl: string;
  nextPayment: string;
  payment?: number;
  children: React.ReactNode;
  daysRemaining: number;
}

const PaymentModal: React.FC<IPaymentModal> = ({ daysRemaining, userId, userName, picUrl, nextPayment, payment = 2000, children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { form, onSubmit } = useCreateInvoiceForm();
  const { register, handleSubmit, setValue } = form;

  useEffect(() => {
    if (open) {
      setValue('userId', userId);
      setValue('fee', payment);
      setValue('nextPayment', new Date(nextPayment).toISOString().split('T')[0]);
    }
  }, [open]);

  return (
    <div>
      <IconButton onClick={handleOpen}>{children}</IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='flex justify-center items-center h-[100vh]'>
          <form {...form} onSubmit={handleSubmit(onSubmit)} className="bg-[#ffffff] rounded-3xl p-10 w-[500px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Avatar src={picUrl} alt={userName} className="w-full h-full object-cover" />
              </div>
              <Typography variant="h6" component="h2" className="font-semibold">
                {userName}
                <Chip className={`cursor-pointer ml-2 text-white ${daysRemaining < 0 ? 'bg-red-600' : 'bg-green-600'}`} label={`${daysRemaining} days remaining`} />
              </Typography>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Typography variant="subtitle1">Payment Amount</Typography>
                <TextField
                  {...register('fee', { valueAsNumber: true })}
                  type="number"
                  className="w-[200px]"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        Rs.
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: 1,
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <Typography variant="subtitle1">Next Payment Date</Typography>
                <TextField
                  {...register('nextPayment')}
                  type="date"
                  className="w-[200px]"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: 1,
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit" className="bg-black hover:bg-gray-900">
                  Confirm Payment
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}


interface IAttendanceModal {
  userId: string;
  userName?: string;
  children: React.ReactNode
}
const AttendanceModal: React.FC<IAttendanceModal> = ({ userId, userName, children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { registerAttendance } = useAttendence()

  return (
    <div>
      <div onClick={handleOpen}>{children}</div>
      {/* <IconButton onClick={handleOpen}>{children}</IconButton> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='flex justify-center items-center h-[100vh]'>
          <div className="bg-[#ffffff] rounded-3xl p-10">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirm Attendance
            </Typography>
            {/* <p> userId {userId}</p> */}
            <p className='font-mono my-4'> Name: {userName}</p>

            <div className="flex w-full justify-center gap-4 mt-4">
              <Button onClick={() => { registerAttendance(userId, "MORNING"); handleClose() }} variant='outlined' className='hover:scale-105 transition-all duration-300 w-full rounded-xl border-black text-black'>Morning</Button>
              <Button onClick={() => { registerAttendance(userId, "EVENING"); handleClose() }} variant='contained' className='w-full hover:scale-105 transition-all bg-black rounded-xl'>Evening</Button>
            </div>
            <div className="flex w-full justify-center gap-4 mt-4">
              <Button onClick={handleClose} variant='outlined' className='hover:scale-105 transition-all duration-300 w-full rounded-xl border-red-500 text-red-500'>Cancel</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const renderCheck = (val: boolean) => (
  <div className="flex h-full items-center justify-center">
    {val ? <GridCheckCircleIcon color="success" fontSize="medium" /> : '-'}
  </div>
);