import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventSelector from './EventSelector';
import PaymentSelector from './PaymentSelector';
import { debounce } from 'lodash';


function NameInput() {
    const [customerName, setCustomerName] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const fetchOptions = async (value) => {
        try {
            const response = await fetch(`/api/v1/Customer?name=${value}`);
            console.log("data" + response);
            const data = await response.json();
            if (data && Array.isArray(data) && data.length > 0) {
                setSuggestions(data);
            } else {
                setSuggestions([{ id: -1, firstName: 'No Existing Customer', lastName: ' - New Drop In', email: '' }]);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setSuggestions([{ id: -2, firstName: 'Failed to', lastName: ' fetch customers data', email: '' }]); // 错误处理，清空建议列表
        }
    };

    const debouncedFetchOptions = debounce(fetchOptions, 500);

    // // 直接定义 options 为一个数组
    // const options = [
    //     { id: 1, firstName: 'Violet', lastName: 'Zhang', email: '123@gmail.com' },
    //     { id: 2, firstName: 'Vivian', lastName: 'Law', email: '456@hotmail.com' },
    //     { id: 3, firstName: 'Henry', lastName: 'Birt', email: '789@foxmail.com' }
    // ];

    const handleInputChange = (e) => {
        const value = e.target.value.toLowerCase();
        setCustomerName(value);
        if (value.length > 0) {
            debouncedFetchOptions(value);
        } else {
            setSuggestions([]); // 如果输入为空，则清空建议列表
        }
    };

    const navigate = useNavigate();

    const handleSuggestionClick = (suggestion) => {
        if (suggestion.id === -1) {
            navigate('/register');
        } else {
            setSelectedCustomer(suggestion);
            setShowDetails(true);            // 显示会员详细信息
            setSuggestions([]);  // 清空建议列表
        }
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
        setShowDetails(false);           // 隐藏会员详细信息
    };

    const isCheckInEnabled = selectedEvents.length > 0 && selectedPayment !== null;

    const handleCheckInClick = () => {
        if (selectedEvents.length > 0 && selectedPayment !== null) {
            // 执行检入操作
            console.log('Check in successful with events:', selectedEvents, 'and payment:', selectedPayment);
            // 可以在这里添加更多的逻辑，例如调用 API
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
                        onChange={handleInputChange}
                    />
                    {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((suggestion) => (
                                <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
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
                        {/* 你可以在这里添加更多详细信息，如会员状态等 */}
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
