import { Tabs, Typography, Box, Tab } from "@mui/material";
import UserListTab from "./UserListTab";
import { useState } from "react";
import UserCreateTab from "./UserCreateTab";
import UserUpdateTab from "./UserUpdateTab";

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
                  Users
            </Typography>


            <Box sx={{ width: '100%' }}>

                  {/* tabs */}
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                              <Tab label="Users" />
                              <Tab label="Create User" />
                              <Tab label="Update User" />
                        </Tabs>
                  </Box>

                  {/* user List  */}
                  <CustomTabPanel value={value} index={0}>
                        <UserListTab />
                  </CustomTabPanel>

                  {/* Create User */}
                  <CustomTabPanel value={value} index={1}>
                        <UserCreateTab />
                  </CustomTabPanel>


                  {/* User Update  */}
                  <CustomTabPanel value={value} index={2}>
                        <UserUpdateTab />
                  </CustomTabPanel>
            </Box>
      </>
}




interface TabPanelProps {
      children?: React.ReactNode;
      index: number;
      value: number;
}
export function CustomTabPanel(props: TabPanelProps) {
      const { children, value, index } = props;

      return (
            <div
                  hidden={value !== index}
                  id={`simple-tabpanel-${index}`}
                  aria-labelledby={`simple-tab-${index}`}
            >
                  {value === index && <>{children}</>}
            </div>
      );
}