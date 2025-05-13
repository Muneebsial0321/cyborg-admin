import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { Edit, ViewAgenda } from '@mui/icons-material';
import { format } from "date-fns"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { InvoiceType } from '../Invoice.type';
import useInvoices from '../useInvoice';
import InvoiceSearch from './InvoiceSearchComp';




const paginationModel = { page: 0, pageSize: 5 };

export default function InvoiceListTab() {

  const columns: GridColDef<InvoiceType>[] = [

    // id
    // { field: 'id', headerName: 'ID', width: 70 },

    // username
    {
      field: 'username', headerName: 'User', width: 130,
      renderCell: ((params) => {
        return <>{params.row.user.name}</>
      })
    },
    // phone
    {
      field: 'phone', headerName: 'Phone', width: 130,
      renderCell: ((params) => {
        return <>{params.row.user.phoneNumber}</>
      })
    },
    // invoice type
    {
      field: 'invoiceType', headerName: 'Billing', width: 130,
      renderCell: ((params) => {
        return <>{params.row.invoiceType == "MONTHLY_FEE" ? "monthly" : "Registration"}</>
      })
    },
    // payment
    {
      field: 'payment', headerName: 'Fee', width: 130,
      renderCell: ((params) => {
        return <>Rs.{params.row.fee}</>
      })
    },
    // desc
    {
      field: 'description', headerName: 'Description', width: 130,
      renderCell: ((params) => {
        return <>{params.row.description}</>
      })
    },
    // created At
    {
      field: 'createdAt', headerName: 'Created AT', width: 130,
      renderCell: ((params) => {
        return <>{format(new Date(params.row.createdAt), 'MMMM do, yyyy')}</>
      })
    },
    // next payment
    {
      field: 'nextPayment', headerName: 'Next Payment', width: 130,
      renderCell: ((params) => {
        return <>{format(new Date(params.row.user.nextPayment), 'MMMM do, yyyy')}</>
      })
    },
    // actions
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

            <InvoiceModal invoice={params.row} />

          </Tooltip>
        </div>
      }
      )
    }
  ];
  const { getInvoices } = useInvoices()
  return (

    <>

      <Paper
        className='w-[97%] p-4 hide-scrollbar'
      >
        <InvoiceSearch />

        <div className="w-[full] hide-scrollbar">


          <DataGrid
            className='overflow-auto hide-scrollbar'
            rows={getInvoices}
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




const InvoiceModal = ({ invoice }: { invoice: InvoiceType }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}><ViewAgenda /></IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='flex justify-center items-center h-[100vh]'>
          <div className="bg-[#ffffff] rounded-3xl p-10 w-[20rem]">
            <Typography className='mb-4' id="modal-modal-title" variant="h6" component="h2">
              Invoice Details
            </Typography>

            {/* invoice */}

            {/*name */}
            <div className="flex justify-between">
              <p className='font-mono text-sm font-semibold text-gray-500 w-full'>
                User Name:
              </p>
              <p className='font-bold text-sm text-gray-600'>
                {invoice.user.name}
              </p>
            </div>


            {/*phone */}
            <div className="flex justify-between">
              <p className='font-mono text-sm font-semibold text-gray-500 w-full'>
                Cell Phone:
              </p>
              <p className='font-bold text-sm text-gray-600'>
                {invoice.user.phoneNumber}
              </p>
            </div>


            {/*name */}
            <div className="flex justify-between">
              <p className='font-mono text-sm font-semibold text-gray-500 w-full'>
                Pay Date:
              </p>
              <p className='font-bold text-sm text-gray-600 whitespace-nowrap'>
                {format(invoice.createdAt, "MM dd ,yyyy")}
              </p>
            </div>

            {/*next Pay */}
            <div className="flex justify-between">
              <p className='font-mono text-sm font-semibold text-gray-500 w-full'>
                Next Payment:
              </p>
              <p className='font-bold text-sm text-gray-600 whitespace-nowrap'>
                {format(invoice.user.nextPayment, "MM dd ,yyyy")}
              </p>
            </div>


            {/*Money */}
            <div className="flex justify-between">
              <p className='font-mono text-sm font-semibold text-gray-500 w-full'>
                Fee:
              </p>
              <p className='font-bold text-lg text-gray-800 whitespace-nowrap'>
                Rs.{invoice.fee}
              </p>
            </div>


            {/*desc */}
            <div className="flex justify-between">
              <p className='font-mono text-sm font-semibold text-gray-500 w-full'>
                Description:
              </p>
              <p className='font-bold text-sm text-gray-600'>
                {invoice.invoiceType}
              </p>
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
