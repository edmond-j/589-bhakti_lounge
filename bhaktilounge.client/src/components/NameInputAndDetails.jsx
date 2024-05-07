import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivitySelector from './ActivitySelector';
import EventSelector from './EventSelector';
import PaymentSelector from './PaymentSelector';
import { debounce } from 'lodash';


function NameInput() {
    const [customerName, setCustomerName] = useState('');
    const [suggestions, setCustomerSuggestions] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showDetails, setShowCustomerDetails] = useState(false);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const fetchOptions = async (value) => {
        try {
            const response = await fetch(`/api/v1/Customer?name=${value}`);
            console.log("data" + response);
            const data = await response.json();
            if (data && Array.isArray(data) && data.length > 0) {
                setCustomerSuggestions(data);
            } else {
                setCustomerSuggestions([{ id: -1, firstName: 'No Existing Customer', lastName: ' - New Drop In', email: '' }]);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setCustomerSuggestions([{ id: -2, firstName: 'Failed to', lastName: ' fetch customers data', email: '' }]); // 错误处理，清空建议列表
        }
    };

    const debouncedFetchOptions = debounce(fetchOptions, 500);

    const handleNameInputChange = (e) => {
        const value = e.target.value.toLowerCase();
        setCustomerName(value);
        if (value.length > 0) {
            debouncedFetchOptions(value);
        } else {
            setCustomerSuggestions([]); // 如果输入为空，则清空建议列表
        }
    };

    const navigate = useNavigate();

    const handleCustomerSuggestionClick = (customerSuggestion) => {
        if (customerSuggestion.id === -1) {
            navigate('/register');
        } else {
            setSelectedCustomer(customerSuggestion);
            setShowCustomerDetails(true);            // 显示会员详细信息
            setCustomerSuggestions([]);  // 清空建议列表
        }
    };

    const subscribe = () => {
        navigate(`/subscribe/${selectedCustomer.id}/${selectedCustomer.firstName}/${selectedCustomer.lastName}/${selectedCustomer.email}`);
    }

    const handleSelectedActivities = (selected) => {
        setSelectedActivities(selected);
        console.log("Selected Activities: ", selected);
    };

    const handleSelectedEvents = (selected) => {
        setSelectedEvents(selected);
        console.log("Selected Events: ", selected);
    };

    const handleSelectedPayment = (selected) => {
        setSelectedPayment(selected);
        console.log("Selected Payment: ", selected);
    };

    const handleBackClick = () => {
        setSelectedCustomer(null);       // 清空选中的客户信息
        setShowCustomerDetails(false);           // 隐藏会员详细信息
    };

    const isCheckInEnabled = (selectedEvents.length > 0 || selectedActivities.length > 0) && selectedPayment !== null;

    const handleCheckInClick = () => {
        if (isCheckInEnabled) {
            console.log('Check in successful with events:', selectedEvents, 'and activities:', selectedActivities, 'and payment:', selectedPayment);
        } else {
            console.error('Check in failed: No events or payment selected');
        }
    };

    return (
        <div className="form-container" >
            {!showDetails && (
                <>
                    <label className="input-labels">Customer Name</label>
                    <input
                        type="text"
                        placeholder="Customer Name"
                        value={customerName}
                        onChange={handleNameInputChange}
                    />
                    {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((suggestion) => (
                                <li key={suggestion.id} onClick={() => handleCustomerSuggestionClick(suggestion)}>
                                    {suggestion.firstName} {suggestion.lastName} ({suggestion.email})
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
            {showDetails && selectedCustomer && (
                <>
                    <div className="customer-details">
                        <h3>Existing Customer</h3>

                        <label className="input-labels">First Name</label>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={selectedCustomer.firstName}
                            readOnly
                        />

                        <label className="input-labels">Last Name</label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={selectedCustomer.lastName}
                            readOnly
                        />

                        <label className="input-labels">Email</label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={selectedCustomer.email}
                            readOnly
                        />

                        <label className="input-labels">Membership</label>
                        <input
                            type="text"
                            placeholder="Membership"
                            value={selectedCustomer.id}
                            readOnly
                        />
                        <button className='button-class' onClick={subscribe}>Buy Membership</button>

                        <ActivitySelector onActivitySelect={handleSelectedActivities} />

                        <EventSelector onEventSelect={handleSelectedEvents} />

                        <PaymentSelector onPaymentSelect={handleSelectedPayment} />

                        <label className="totalPrice">Total Price: </label>
                    </div>
                    <span className='line-buttons'>
                        <button className='button-class' onClick={handleBackClick}>Back</button>
                        <button
                            className={`button-class ${isCheckInEnabled ? 'enabled' : 'disabled'}`}
                            onClick={isCheckInEnabled ? handleCheckInClick : undefined}
                            disabled={!isCheckInEnabled}
                        >
                            CheckIn
                        </button>
                    </span>

                </>
            )}

        </div>
    );
}

export default NameInput;
