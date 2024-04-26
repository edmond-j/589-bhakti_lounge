import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const SearchName = () => {
    const [clientName, setClientName] = useState('');
    const navigateTo = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Reset form or give feedback to the user
        navigateTo('/new-check-in', {state: {clientName}});
    };

    return (
        <div className='page-container'>
            <header className="header">
                <h1>BHAKTI Lounge</h1>
                <button onClick={() => console.log('Log out')}>Log out</button>
            </header>
            <div className="main-content">
                <h2>Search for a Customer</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Customer Name</label>
                        <input
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder='Enter a name'
                        />
                    </div>
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
    );
}

export default SearchName;