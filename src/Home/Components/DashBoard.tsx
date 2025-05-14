import { Typography } from "@mui/material"
import DashBoardWidget from "./DashBoardWidget"

const DashBoard = () => {
    return (
        <div className="px-10 flex justify-center flex-col -items-center">
             <Typography
                  variant='h3'
                  component={"h3"}
                  className='py-4'
            >
                  Dashboard
            </Typography>
            {/*canvas  */}
            <div className="grid grid-cols-3 gap-4">
                {[11,1,1,1,1,1].map((_, i) => (
                    <DashBoardWidget
                        key={i}
                        label="User"
                        data="809"
                    />
                ))}

            </div>

        </div>
    )
}

export default DashBoard