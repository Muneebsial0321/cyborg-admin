import { Card } from "@mui/material"

const DashBoardWidget = ({ label = "label", data = "data" }: { label: string, data: string }) => {
    return (
        <Card
            elevation={9}
            variant="elevation"
            className="w-[16rem] px-4 py-4 rounded-xl flex gap-[2rem]">
            <div className="data w-[7rem]">
                <p className="text-xl  font-semibold">{label}</p>
                <p className="text-5xl font-bold">{data}</p>
            </div>
            <div className="img h-full flex justify-center items-center">
                <img 
                className="size-[5rem] object-cover"
                src="/widget.svg" alt="" />
            </div>
        </Card>
    )
}

export default DashBoardWidget