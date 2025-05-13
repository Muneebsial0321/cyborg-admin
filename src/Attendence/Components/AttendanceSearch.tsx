import { Search } from '@mui/icons-material'
import { FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField } from '@mui/material'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const AttendanceSearch = () => {
    const [, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState<string | null>("")
    const [attendanceType, setAttendanceType] = useState<string | null>(null)
    const [createdAt, setCreatedAt] = useState<string | null>(null)

    const handleSearchClick = () => {
        setSearchParams({
            ...(query ? { query } : {}),
            ...(attendanceType ? { attendanceType } : {}),
            ...(createdAt ? { createdAt } : {}),
        })
    }
    return (
        <Paper
            className='py-3 mb-4 px-3 flex items-center gap-5'
            elevation={2}
        >

            {/* text field */}
            <div className="">
                <TextField
                    onKeyDown={(e) => e.key == "Enter" ? handleSearchClick() : null}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className='w-[19rem]'
                    placeholder='Enter email or name'
                />
            </div>



            {/* select */}
            <div className="">
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={attendanceType}
                        onChange={(e) => setAttendanceType(e.target.value as string)}
                        label="Status"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"MORNING"}>Morning</MenuItem>
                        <MenuItem value={"EVENING"}>Evening</MenuItem>
                        {/* <MenuItem value={""} >Clear</MenuItem> */}
                    </Select>
                </FormControl>
            </div>

            {/* createdAT */}
            <OutlinedInput type="date"
                value={createdAt}
                onChange={(e) => {
                    setCreatedAt((e.target.value));
                }}
            />


            {/* Button */}
            <div className="shadow-3xl">
                <IconButton
                    onClick={handleSearchClick}
                    className='bg-blue-600 size-13 '>
                    <Search className='text-white' />
                </IconButton>
            </div>
        </Paper>
    )
}

export default AttendanceSearch