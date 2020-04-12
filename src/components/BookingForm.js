import React, {useState} from 'react';

export const BookingForm = ({firstName, lastName, phoneNumber, onSubmit}) =>  {    

    const [usr, setUser] = useState({firstName, lastName, phoneNumber});
    const handleChange = ({target}) =>  setUser({
        ...user,
        [target.name]: target.value
    });

    const user = {firstName};
    return <div className="container">
`           <form className="form-group" id="bookingForm" onSubmit={() => onSubmit(usr)}>
                <div className="row">
                    <div className="form-group col-md-4 offset-md-4">
                        <label htmlFor="firstName">First name</label>
                        <input  className="form-control" type="text" name="firstName" id="firstName" 
                        onChange={handleChange} value={firstName} />
                    <label htmlFor="lastName">Last name</label>
                        <input className="form-control" type="text" name="lastName" id="lastName"
                        onChange={handleChange} value={lastName} />
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input className="form-control" type="text" name="phoneNumber" id="phoneNumber"
                        onChange={handleChange} value={phoneNumber} />
                        <br />
                    <input className="btn btn-primary" type="submit" value="Add" />
                    </div>
                </div>                                               
            </form>
    </div> 
} 
