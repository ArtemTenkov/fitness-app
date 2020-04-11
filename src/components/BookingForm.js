import React, {useState} from 'react';

export const BookingForm = ({firstName, onSubmit}) =>  {    

    const [usr, setUser] = useState({firstName});
    const handleChangeName = ({target}) =>  setUser({
        ...user,
        firstName: target.value
    });

    const user = {firstName};
    return <form id="bookingForm" onSubmit={() => onSubmit(usr)}>
                <label htmlFor="firstName">First name</label>
                <input  type="text" name="firstName" id="firstName" 
                onChange={handleChangeName} value={firstName} />
            </form>
} 
