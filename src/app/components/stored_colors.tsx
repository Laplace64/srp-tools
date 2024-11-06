import { Box, Button, Drawer, Input, List, ListItem } from "@mui/material";
import { useState } from "react";
import ColorBox from "./colorbox";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export interface IStoredColor {
    color: string;
    name: string;
}

function ColorItem({
    color,
    name,
    setColor,
}: {
    color: string;
    name: string;
    setColor: (color: string, name: string) => void;
}) {
    return <div className="flex flex-row gap-2">
        <ColorBox color={color} setColor={(color: string) => {
            setColor(color, name);
        }}/>
        <Input value={name} onChange={(e) => {
            setColor(color, e.target.value);
        }}/>
    </div>;
} 

export default function StoredColors({
    colors,
    onChange,
}: {
    colors: IStoredColor[];
    onChange: (colors: IStoredColor[]) => void;
}) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setOpen(open);
    };

    const DrawerList = (
        <Box sx={{ width: 300 }} role="presentation">
            
            <List>
                <ListItem>
                    <div className="flex flex-col">
                        <div className="text-2xl">Custom colors</div>
                        <div className="text-sm italic">The color can be used by @name</div>
                    </div>
                    
                </ListItem>
                {
                    colors.map((stored, index) => {
                        return (
                            <ListItem key={`${index}`}>
                                <ColorItem color={stored.color} name={stored.name} setColor={(color: string, name: string) => {
                                    colors[index] =  { color: color, name: name };
                                    onChange([...colors]);
                                }}/>

                                <Button onClick={() => {
                                    colors.splice(index, 1)
                                    onChange([...colors]);
                                }} startIcon={<DeleteIcon/>}></Button>

                                <Box className="flex flex-col gap-1">
                                    <Button size="small" onClick={() => {
                                        if (index === 0) return;
                                        const temp = colors[index];
                                        colors[index] = colors[index - 1];
                                        colors[index - 1] = temp;
                                        onChange([...colors]);
                                    }}><ArrowDropUpIcon/></Button>
                                    <Button size="small" onClick={() => {
                                        if (index === colors.length - 1) return;
                                        const temp = colors[index];
                                        colors[index] = colors[index + 1];
                                        colors[index + 1] = temp;
                                        onChange([...colors]);
                                    }}><ArrowDropDownIcon/></Button>
                                </Box>

                            </ListItem>
                        );
                    })
                }
                <ListItem>
                    <Button variant="outlined" startIcon={<AddIcon/>} onClick={
                        () => {
                            onChange([...colors, {color: "#ffffff", name: "New color"}]);
                        }
                    }>Add color</Button>
                </ListItem>
            </List>
        </Box>
    );

    

    return <div>
        <Button onClick={toggleDrawer(true)}>Stored colors</Button>
        <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
            
            {DrawerList}
        </Drawer>
    </div>;
}