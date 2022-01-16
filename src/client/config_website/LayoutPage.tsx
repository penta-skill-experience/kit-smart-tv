import * as React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export function LayoutPage() {
    const initialList = [];
    const [list, setList] = React.useState(initialList);
    const [widget, setWidget] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setWidget(event.target.value)
        setList(list.concat(widget));
    }

    return(
        <div>
            <ul>
                {list.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <FormControl sx={{minWidth: 120}}>
                <Select
                    value={widget}
                    onChange={handleChange}
                >
                    //todo
                    //Add widgets
                    <MenuItem value={'test1'}>Test1</MenuItem>
                    <MenuItem value={'test2'}>Test2</MenuItem>
                    <MenuItem value={'test3'}>Test3</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}