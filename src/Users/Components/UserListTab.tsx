import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import useUsers from '../useUsers';
import { Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';
import UserSearch from './UserSearch';
import { format } from "date-fns"



const paginationModel = { page: 0, pageSize: 5 };

export default function UserListTab() {

  const columns: GridColDef<UsersType>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    // { field: 'email', headerName: 'Email', width: 130 },
    { field: 'hasAttendanceToday', headerName: 'Attendance', width: 130 },
    { field: 'phoneNumber', headerName: 'Phone', width: 130 },
    {
      field: 'nextPayment', headerName: 'Next Payment', width: 130
      , renderCell: ((params) => {
        return <>{format(new Date(params.row.nextPayment!), 'MMMM do, yyyy')}</>
      })
    },
    {
      field: 'none', headerName: 'Fee Status', width: 140,
      renderCell: ((param) => {

        const PaymentStatus = param.row.hasPaid
        return <>
          <div className="w-full -flex -justify-center">
            {PaymentStatus == "paid" && <Chip
              variant='filled'
              label="Paid"
              size='medium'
              className='bg-green-600 text-white mx-auto w-[7rem] shadow-2xl'
              clickable={true}
            />}

            {PaymentStatus == "finishing" && <Chip
              variant='filled'
              label="Ending"
              size='medium'
              className='bg-yellow-500 text-white mx-auto w-[7rem] shadow-2xl'
              clickable={true}
            />}

            {PaymentStatus == "due" && <Chip
              variant='filled'
              label="Due"
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

        return <div className='w-[10rem] flex items-center'>
          <Tooltip
            title="To Edit User"
          >
            <IconButton>
              <Edit className='text-blue-700' />
            </IconButton>
          </Tooltip>

          <Tooltip
            title="Delete User"
          >

            <PaymentModal userId={params.row.id!} >
              <Delete className='text-red-600' />
            </PaymentModal>

          </Tooltip>


          <Tooltip
            title="Mark Todays attendance"
          >
            <AttendanceModal userId={params.row.id!} userName={params.row.name} >
              <IconButton className={`${params.row.hasAttendanceToday == "Present" ? "hidden" : ""}`}>
                <Save className='text-green-700' />
              </IconButton>
            </AttendanceModal>
          </Tooltip>

        </div>
      }
      )
    }
  ];
  const { getUsers } = useUsers()
  // setSearchParams({ page: '3', filter: 'archived' });
  return (

    <>
      {getUsers &&
        <Paper
          className='w-[97%] p-4 hide-scrollbar'
        >
          <UserSearch />
          <div className="w-[full] hide-scrollbar">


            <DataGrid
              className='overflow-auto hide-scrollbar'
              rows={getUsers}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
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

            />
          </div>
        </Paper>}
    </>
  );
}


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { UsersType } from '../Users.type';
import { useAttendence } from '../../Attendence/useAttendance';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };


interface IPaymentModal {
  userId: string;
  payment?: string;
  cardio?: boolean;
  children: React.ReactNode
}
const PaymentModal: React.FC<IPaymentModal> = ({ userId, cardio = false, payment = 2000, children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <div className="bg-[#ffffff] rounded-3xl p-10">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirm Invoice
            </Typography>
            <p> userId {userId}</p>
            <p> payment {payment}</p>
            <p> cardio {cardio}</p>
            <div className="flex w-full justify-center gap-4 mt-4">
              <Button onClick={handleClose} variant='outlined' className='hover:scale-105 transition-all duration-300 w-full rounded-xl border-red-500 text-red-500'>Cancel</Button>
              <Button variant='contained' className='w-full hover:scale-105 transition-all bg-black rounded-xl'>Confirm</Button>
            </div>
          </div>
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