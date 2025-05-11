import { Search } from '@mui/icons-material'
import { FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const InvoiceSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState<string | null>("")
    const [invoiceType, setInvoiceType] = useState<string | null>("")
    const [createdAt, setCreatedAt] = useState<string | null>(new Date().toDateString())
    // const [nextPayment, setNextPayment] = useState<string | null>(null)
    // const [nextPayment, setNextPayment] = useState<string | null>(new Date(new Date().setMonth(new Date().getMonth() + 1)).toDateString())

    const handleSearchClick = () => {
        setSearchParams({
            ...(query ? { query } : {}),
            ...(invoiceType ? { invoiceType } : {}),
            ...(createdAt ? { createdAt } : {}),
            // ...(nextPayment ? { nextPayment } : {}),
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
                        value={invoiceType}
                        onChange={(e) => setInvoiceType(e.target.value)}
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

            {/* createdAT */}
            <DatePicker
                label="Created At"
                className='w-[11rem]'
                value={new Date(createdAt!)}
                onChange={(newValue: Date | null) => {
                    setCreatedAt(newValue!.toDateString());
                }}
            />

            {/* Payment */}
            {/* <DatePicker
            defaultValue={new Date()}
                label="Next Fee Date"
                className='w-[11rem]'
                value={new Date(nextPayment!)}
                onChange={(newValue: Date | null) => {
                    setNextPayment(newValue!.toDateString());
                }}
            /> */}
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

export default InvoiceSearch