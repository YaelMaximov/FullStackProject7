import React, { useState } from "react";
import DateTimePicker from 'react-datetime-picker';


function DatePicker() {
    const [value, setValue] = useState(new Date());

    const onChange = (date) => {
        setValue(date);
    };
    
    return (
        <div className="p-5">
            <DateTimePicker onChange={onChange} value={value} />
        </div>
    )
}

export default DatePicker;