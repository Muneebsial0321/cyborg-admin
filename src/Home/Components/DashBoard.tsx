import DashBoardWidget from "./DashBoardWidget"

const DashBoard = () => {
    return (
        <div className="px-10 flex justify-center flex-col -items-center">
            <h1 className="text-5xl font-semibold my-8">
                Dashboard
            </h1>
            {/*canvas  */}
            <div className="grid grid-cols-4 gap-4">
                {[11,1,1,1,1,1,1,1].map((e, i) => (
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