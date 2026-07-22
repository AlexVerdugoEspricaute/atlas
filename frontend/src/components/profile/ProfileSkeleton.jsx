import {
    Box,
    Skeleton,
    Stack
} from "@mui/material";

import {
    AtlasCard
} from "../../design-system";


const ProfileSkeleton = ()=>{

    return (
        <Stack
            spacing={3}
        >
            {/* Header */}

            <AtlasCard>

                <Box
                    sx={{
                        p:3,
                        display:"flex",
                        alignItems:"center",
                        gap:3
                    }}
                >

                    <Skeleton
                        variant="circular"
                        width={90}
                        height={90}
                    />

                    <Box
                        sx={{
                            flex:1
                        }}
                    >

                        <Skeleton
                            variant="text"
                            width="40%"
                            height={40}
                        />

                        <Skeleton
                            variant="text"
                            width="30%"
                        />

                        <Skeleton
                            variant="text"
                            width="20%"
                        />
                    </Box>
                </Box>
            </AtlasCard>

            {/* Content cards */}

            <Box
                sx={{
                    display:"grid",
                    gridTemplateColumns:{
                        xs:"1fr",
                        md:"350px 1fr"
                    },
                    gap:3
                }}
            >

                <AtlasCard>
                    <Box
                        sx={{
                            p:3
                        }}
                    >

                        <Skeleton
                            variant="circular"
                            width={120}
                            height={120}
                            sx={{
                                mx:"auto"
                            }}
                        />

                        <Skeleton
                            variant="text"
                            sx={{
                                mt:2
                            }}
                        />

                        <Skeleton
                            variant="text"
                            width="70%"
                        />

                    </Box>

                </AtlasCard>

                <Stack
                    spacing={3}
                >
                    {
                        [1,2,3].map(
                            (item)=>(
                                <AtlasCard
                                    key={item}
                                >
                                    <Box
                                        sx={{
                                            p:3
                                        }}
                                    >

                                        <Skeleton
                                            variant="text"
                                            width="35%"
                                            height={35}
                                        />

                                        <Skeleton
                                            variant="rectangular"
                                            height={45}
                                            sx={{
                                                mt:2
                                            }}
                                        />

                                        <Skeleton
                                            variant="rectangular"
                                            height={45}
                                            sx={{
                                                mt:2
                                            }}
                                        />

                                    </Box>
                                </AtlasCard>
                            )
                        )
                    }
                </Stack>
            </Box>
        </Stack>
    );
};


export default ProfileSkeleton;