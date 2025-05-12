import { DataGrid, GridColDef } from "@mui/x-data-grid"

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', width: 60
    },
    {
        field: 'firstName', headerName: 'First name', width: 150
    },
    {
        field: 'lastName', headerName: 'Last name', width: 150
    },
    {
        field: 'age', headerName: 'Age', type: 'number', width: 60,
    },
    // {
    //     field: 'fullName', headerName: 'Full name', description: 'This column has a value getter and is not sortable.', sortable: false, width: 160, valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
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

const paginationModel = { page: 0, pageSize: 5 };

const DashBoardUserSection = () => {
    return (
        <div
            className="px-10 mt-[3rem]"
        >
            {/* <Paper sx={{ width: '100%' }}> */}
                <DataGrid
                className="w-[50rem] px-3"
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            fontSize: '20px',        // 🎯 Increase header font size
                            fontWeight: 'bold',      // 🎯 Make it bold if you want
                        }
                    }}
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                />
            {/* </Paper> */}
        </div>
    )
}

export default DashBoardUserSection