import { Avatar, Card, CardContent, Typography } from "@mui/material"


export const UserDetailsCard = ({ personalDetails }) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    {personalDetails.name}
                </Typography>
                <Typography variant="h3" component="div"> {personalDetails.team}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {/* {personalDetails.joinedAt?.getDate()} */}
                </Typography>
                <Avatar src={personalDetails.avatar}
                    sx={{ bgcolor: ' #b5b5b5', border: 3, borderColor: '#a7a7a7', height: 37, width: 37, margin: 0.15 }}>
                </Avatar>
            </CardContent>
        </Card>
    )
}