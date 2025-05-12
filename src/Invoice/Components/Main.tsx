import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { CustomTabPanel } from "../../Users/Components/Main";
import InvoiceListTab from "./InvoiceListTab";

export default function Main() {
      const [value, setValue] = useState(0);
      const handleChange = (event: React.SyntheticEvent, newValue: number) => {
            console.log(event);
            
            setValue(newValue);
      }
      return <>
            <Typography
                  variant='h3'
                  component={"h3"}
                  className='py-4'
            >
                  Invoices
            </Typography>

            
            <Box sx={{ width: '100%' }}>

                  {/* tabs */}
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                              <Tab label="Invoices" />
                        </Tabs>
                  </Box>

                  {/* user List  */}
                  <CustomTabPanel value={value} index={0}>
                        <InvoiceListTab />
                  </CustomTabPanel>

            </Box>
      </>
}