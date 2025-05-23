import { Skeleton, Box } from '@mui/material';

const DataGridSkeleton = ({ rowCount = 8, rowHeight = 40 }) => {
    return (
        <Box className="space-y-2">
            <Skeleton
                variant="rectangular"
                height={50}
                animation="wave"
                sx={{ borderRadius: 2 }}
            />
            {[...Array(rowCount)].map((_, i) => (
                <Skeleton
                    key={i}
                    variant="rectangular"
                    height={rowHeight}
                    animation="wave"
                    sx={{ borderRadius: 4 }}
                />
            ))}
        </Box>
    );
};

export default DataGridSkeleton;
