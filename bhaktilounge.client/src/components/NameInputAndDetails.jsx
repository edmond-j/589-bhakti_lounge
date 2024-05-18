import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import ActivitySelector from './ActivitySelector';
import EventSelector from './EventSelector';
import PaymentSelector from './PaymentSelector';
import { useLocation } from 'react-router-dom';

function NameInput() {
    const [suggestions, setCustomerSuggestions] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showDetails, setShowCustomerDetails] = useState(false);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [membershipDetail, setMembershipDetail] = useState('');
    const [hasMembership, setHasMembership] = useState(false);

    //get name data from register page
    const location = useLocation();
    const [customerName, setCustomerName] = useState(location.state?.FirstName || '');

    const fetchOptions = async (value) => {
        try {
            const response = await fetch(`/api/v1/Customer?name=${value}`);
            console.log('data' + response);
            const data = await response.json();
            if (data && Array.isArray(data) && data.length > 0) {
                setCustomerSuggestions(data);
            } else {
                setCustomerSuggestions([
                    {
                        id: -1,
                        firstName: 'No Existing Customer',
                        lastName: ' - New Drop In',
                        email: '',
                    },
                ]);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setCustomerSuggestions([
                { id: -2, firstName: 'Failed to', lastName: ' fetch customers data', email: '' },
            ]); // 错误处理，清空建议列表
        }
    };

    const debouncedFetchOptions = debounce(fetchOptions, 500);

    const handleNameInputChange = (e) => {
        const inputValue = e.target.value;
        setCustomerName(inputValue);
        console.log(inputValue);
        if (inputValue.length > 1) {
            debouncedFetchOptions(inputValue);
        }else if(inputValue.length == 0){
            setCustomerSuggestions("")
        }
    };

    const navigate = useNavigate();

    const handleCustomerSuggestionClick = (customerSuggestion) => {
        if (customerSuggestion.id === -1) {
            navigate('/check/register');
        } else {
            setSelectedCustomer(customerSuggestion);
            setShowCustomerDetails(true);
            setCustomerSuggestions([]);
            console.log(customerSuggestion);
        }
    };

    useEffect(() => {
        if (selectedCustomer !== null && selectedCustomer.passRemain !== null) {
            setMembershipDetail('Membership (expire on ' + selectedCustomer.subEndDate + ')');
            setHasMembership(true);
        } else {
            setMembershipDetail('None');
            setHasMembership(false);
        }
    }, [selectedCustomer]);

    const subscribe = () => {
        navigate(
            `/check/subscribe/${selectedCustomer.id}/${selectedCustomer.firstName}/${selectedCustomer.lastName}/${selectedCustomer.email}`
        );
    };

    const handleSelectedActivities = (selected) => {
        setSelectedActivities(selected);
        console.log(selected);
    };

    const handleSelectedEvents = (selected) => {
        setSelectedEvents(selected);
        console.log(selected);
    };

    const handleSelectedPayment = (selected) => {
        setSelectedPayment(selected);
    };

    const handleBackClick = () => {
        setSelectedCustomer(null); // 清空选中的客户信息
        setShowCustomerDetails(false); // 隐藏会员详细信息
    };

    const isCheckInEnabled =
        (selectedEvents.length > 0 || selectedActivities.length > 0) && selectedPayment !== null;

    const handleCheckInClick = async () => {
        if (isCheckInEnabled) {
            const date = new Date();
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date
                .getMinutes()
                .toString()
                .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
            const newCheckin = {
                date: formattedDate,
                time: formattedTime,
                customerId: selectedCustomer.id,
                payment: selectedPayment.id,
                activitiesId: selectedActivities.map((activity) => activity.id),
                eventsId: selectedEvents.map((event) => event.id),
                totalPrice: parseFloat(totalPrice),
                isFirstTime: true, // 这个值根据实际业务逻辑进行设置
            };

            try {
                const response = await fetch('/api/v1/Checkin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newCheckin),
                });

                if (response.ok) {
                    console.log('Check-in successful:', await response.json());
                    alert(
                        selectedCustomer.firstName +
                            ' ' +
                            selectedCustomer.lastName +
                            ' has been checked in! '
                    );
                    navigate(0);
                } else {
                    console.error('Failed to add check-in:', await response.text());
                }
            } catch (error) {
                console.error('Error while adding check-in:', error);
            }
        } else {
            console.error('Check-in failed: No events or payment selected');
        }
    };

    const calculateTotalPrice = () => {
        const activitiesPrice = selectedActivities.reduce(
            (sum, activity) => sum + (activity.price || 0),
            0
        );
        const eventsPrice = selectedEvents.reduce((sum, event) => sum + (event.price || 0), 0);
        if (selectedPayment === 7) {
            setTotalPrice(6);
        } else if (
            selectedPayment === 1 ||
            selectedPayment === 2 ||
            selectedPayment === 6 ||
            selectedPayment === 8
        ) {
            setTotalPrice(0);
        } else {
            setTotalPrice(activitiesPrice + eventsPrice);
        }
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedActivities, selectedEvents, selectedPayment]);

    return (
        <div className='form-group'>
            {!showDetails && (
                <>
                    <label className='input-labels'>Customer Name</label>
                    <input
                        type='text'
                        placeholder='2 letters or more'
                        onChange={handleNameInputChange}
                        value={customerName || ''}
                    />
                    {suggestions.length > 0 && (
                        <ul className='suggestions-list'>
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.id}
                                    onClick={() => handleCustomerSuggestionClick(suggestion)}>
                                    {suggestion.firstName} {suggestion.lastName} ({suggestion.email}
                                    )
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
            {showDetails && selectedCustomer && (
                <>
                    <div className='customer-details'>
                        <h3>Existing Customer</h3>

                        <label>First Name</label>
                        <input
                            type='text'
                            placeholder='First Name'
                            value={selectedCustomer.firstName}
                            readOnly
                        />
                        <label>Last Name</label>
                        <input
                            type='text'
                            placeholder='Last Name'
                            value={selectedCustomer.lastName}
                            readOnly
                        />
                        <label>Email</label>
                        <input
                            type='text'
                            placeholder='Last Name'
                            value={selectedCustomer.email}
                            readOnly
                        />
                        <label>Membership</label>
                        <input
                            type='text'
                            placeholder='Membership'
                            value={membershipDetail}
                            readOnly
                        />
                        <button className='tw-btn mb-4' onClick={subscribe}>
                            Buy Membership
                        </button>
                        <ActivitySelector onActivitySelect={handleSelectedActivities} />
                        <EventSelector onEventSelect={handleSelectedEvents} />
                        <PaymentSelector
                            onPaymentSelect={handleSelectedPayment}
                            hasMembership={hasMembership}
                        />
                        <h3 className='mt-6'>Total Price: ${totalPrice}</h3>
                    </div>
                    <span className='button-container'>
                        <button className='tw-btn' onClick={handleBackClick}>
                            Back
                        </button>
                        <button
                            className={`tw-btn ${isCheckInEnabled ? 'enabled' : 'disabled'}`}
                            onClick={handleCheckInClick}
                            disabled={!isCheckInEnabled}>
                            CheckIn
                        </button>
                    </span>
                </>
            )}
        </div>
    );
}

export default NameInput;
