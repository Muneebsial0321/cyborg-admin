import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { Receipt } from '@mui/icons-material';
import { format } from "date-fns"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { InvoiceType } from '../Invoice.type';
import useInvoices from '../useInvoice';
import InvoiceSearch from './InvoiceSearchComp';




// const paginationModel = { page: 0, pageSize: 5 };

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
    // {
    //   field: 'description', headerName: 'Description', width: 130,
    //   renderCell: ((params) => {
    //     return <>{params.row.description}</>
    //   })
    // },
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
          {/* <Tooltip
            title="To Edit User"
          >
            <IconButton>
              <Edit className='text-blue-700' />
            </IconButton>
          </Tooltip> */}

          <Tooltip
            title="Invoice Details"
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
            // initialState={{ pagination: { paginationModel } }}
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
      <IconButton onClick={handleOpen} size="small">
        <Receipt className="text-blue-300" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            Invoice Details
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              User Name:
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {invoice.user.name}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Cell Phone:
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {invoice.user.phoneNumber}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Pay Date:
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {format(invoice.createdAt, "MMMM do, yyyy")}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Invoice Type:
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {invoice.invoiceType === "MONTHLY_FEE" ? "Monthly Fee" : "Registration"}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Amount:
            </Typography>
            <Typography variant="body1" fontWeight="bold" color="primary">
              Rs.{invoice.fee}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Description:
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {invoice.description}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Next Payment Due:
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {format(new Date(invoice.user.nextPayment), "MMMM do, yyyy")}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
