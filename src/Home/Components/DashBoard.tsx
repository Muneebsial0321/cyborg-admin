import { Typography } from "@mui/material"
import DashBoardWidget from "./DashBoardWidget"
import useDashBoardData from "../useHome"

const DashBoard = () => {
    const { data, isLoading } = useDashBoardData()
    if (isLoading) return "loading"
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
                {data && data.map((e, i) => (
                    <DashBoardWidget
                        key={i}
                        label={e.label!}
                        data={e.data as string}
                    />
                ))}

            </div>

        </div>
    )
}

export default DashBoard