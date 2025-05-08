import React from 'react'
import SideBar from '../Components/SideBar'
import { Box } from '@mui/material'

const SideBarLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        // <div
        // className='flex flex-col'
        // >
        // <SideBar />
        // <div className='px-8 py-2'>
        //     {children}
        // </div>
        // </div>
        <SideBar
        children={children}
        />
    )
}

export default SideBarLayout