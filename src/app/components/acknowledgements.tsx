import { Backdrop, Button, Card, CardContent, Typography } from "@mui/material";
import { useBoolean } from "usehooks-ts";

export function Acknowledgements() {

    const { value, setTrue, setFalse } = useBoolean(false);
    return (
        <div>
            <Button onClick={setTrue}>Acknowledgements</Button>
            <Backdrop 
                open={value}
                onClick={setFalse}
            >
                <Card sx={{ width: "50%"}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }}>
                            Credits and acknowledgements
                        </Typography>
                        <Typography color="textSecondary" sx={{ fontSize: 12 }}>
                            For the people who helped me with this project or made big contributions to its progress!
                        </Typography>
                    </CardContent>
                    <CardContent>
                        Gremlin - Q&A tester that found 80% of the bugs and 100% of the cursed features, the founder of colored quotations
                        <Typography className="gradient">
                            {"\"Colored quotation is a gift from god (I am god) u`hoUODIAHOSDiUAGDUILASGDH - Gremlin\""}
                        </Typography>
                    </CardContent>
                </Card>
            </Backdrop>
        </div>
    )
    
}