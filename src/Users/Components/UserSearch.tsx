import { Search } from '@mui/icons-material'
import { FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const UserSearch = () => {
    const [, setSearchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState<string | null>("")
    const [paymentStatus, setPaymentStatus] = useState<string | null>("")

    const handleSearchClick = () => {
        setSearchParams({
            ...(searchQuery ? { query: searchQuery } : {}),
            ...(paymentStatus ? { pstatus: paymentStatus } : {}),
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
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearchClick()
                        }
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                        label="Status"
                    //   onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"paid"}>Paid</MenuItem>
                        <MenuItem value={"finishing"}>Finishing Soon</MenuItem>
                        <MenuItem value={"due"}>Due</MenuItem>
                    </Select>
                    {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>
            </div>

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

export default UserSearch