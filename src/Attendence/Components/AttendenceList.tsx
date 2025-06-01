import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import AttendanceSearch from './AttendanceSearch';
import { useAttendanceUsers } from '../useAttendance';
import { format } from "date-fns"
import { AttendanceType } from '../Attendance.type';
import { Bedtime, Sunny } from '@mui/icons-material';


// const paginationModel = { page: 0, pageSize: 5 };

export default function AttendanceListTab() {

    const columns: GridColDef<AttendanceType>[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 130, renderCell: (params) => (<>{params.row.User.name}</>) },
        { field: 'phone', headerName: 'Phone', width: 130, renderCell: (params) => (<>{params.row.User.phoneNumber}</>) },
        {
            field: 'Time', headerName: 'Time', width: 130, renderCell: (params) => {
                const time: unknown = params.row.time
                return <div className='w-full flex justify-center items-center h-full'>
                    {time === "EVENING" && <Bedtime className='text-blue-950' />}
                    {time === "MORNING" && <Sunny className='text-yellow-400' />}
                </div>
            }
        },
        { field: 'CreatedAT', headerName: 'Created AT', width: 190, renderCell: (params) => (<>{format(params.row.createdAt, "PPP, p")}</>) },

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

                    />
                </div>
            </Paper>
        </>
    );
}





