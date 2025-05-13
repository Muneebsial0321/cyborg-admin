import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { Delete, Edit, } from '@mui/icons-material';
import AttendanceSearch from './AttendanceSearch';
import { useAttendanceUsers } from '../useAttendance';
import { format } from "date-fns"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { AttendanceType } from '../Attendance.type';


const paginationModel = { page: 0, pageSize: 5 };

export default function AttendanceListTab() {

    const columns: GridColDef<AttendanceType>[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 130, renderCell: (params) => (<>{params.row.User.name}</>) },
        { field: 'phone', headerName: 'Phone', width: 130, renderCell: (params) => (<>{params.row.User.phoneNumber}</>) },
        { field: 'Time', headerName: 'Time', width: 130, renderCell: (params) => (<>{params.row.time}</>) },
        { field: 'CreatedAT', headerName: 'Created AT', width: 130, renderCell: (params) => (<>{format(params.row.createdAt, "PPP, p") }</>) },

        {
            field: "Actions",
            headerName: "Actions",
            width: 200,
            renderCell: ((params) => {
                console.log({ data: params.row.id });

                return <div className='w-[10rem] flex items-center'>
                    <Tooltip
                        title="To Edit Attendance"
                    >
                        <IconButton>
                            <Edit className='text-blue-700' />
                        </IconButton>
                    </Tooltip>

                    <Tooltip
                        title="Delete Attendance"
                    >

                        <PaymentModal userId={params.row.id} >
                            <Delete className='text-red-600' />
                        </PaymentModal>

                    </Tooltip>


                </div>
            }
            )
        }
    ];
    const { data } = useAttendanceUsers()
    // setSearchParams({ page: '3', filter: 'archived' });
    return (

        <>
            <Paper
                className='w-[97%] p-4 hide-scrollbar'
            >
                <AttendanceSearch />
                <div className="w-[full] hide-scrollbar">


                    <DataGrid
                        className='overflow-auto hide-scrollbar'
                        rows={data}
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
            </Paper>
        </>
    );
}






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
