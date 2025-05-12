import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function Main() {
const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 70 },
   { field: 'fullName', headerName: 'Name', width: 130 },
   { field: 'lastName', headerName: 'Phone', width: 130 },
   { field: 'age', headerName: 'Next Payment', width: 130 },
   {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: ({ row }) => {
         return (
            <Box>
               <Tooltip title={`edit row ID:`+row.id}>
               <IconButton 
              
               >
                  <Edit className="text-black" />
               </IconButton>
               </Tooltip>
               <Tooltip title={`edit row ID:`+row.id}>
               <IconButton>
                  <Delete className="text-red-600" />
               </IconButton>
               </Tooltip>
            </Box>
         );
      },
   },

];

const rows = [
   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

// const paginationModel = { page: 0, pageSize: 5 };


   return <div
      className="px-10 mt-[2rem]"
   >
      <h1 className="text-5xl font-semibold">
         Attendence
      </h1>

      <DataGrid
         rows={rows}
         columns={columns}
         // initialState={{ pagination: { paginationModel } }}
         // pageSizeOptions={[5, 10]}
         sx={{
            '& .MuiDataGrid-columnHeaders': {
               fontSize: '20px',        // 🎯 Increase header font size
               fontWeight: 'bold',      // 🎯 Make it bold if you want
            },
            border:0
         }}
      />
   </div>
}