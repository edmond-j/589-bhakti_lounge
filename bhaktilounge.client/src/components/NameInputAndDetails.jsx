import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import ActivitySelector from "./ActivitySelector";
import EventSelector from "./EventSelector";
import PaymentSelector from "./PaymentSelector";
import { useLocation } from "react-router-dom";
import authFetch from "@/utils/authFetch.js";

function NameInput() {
    //get name data from register page
    const location = useLocation();
    const [suggestions, setCustomerSuggestions] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(location.state?.customer ? location.state?.customer : null);
    const [hasMembership, setHasMembership] = useState(false);
    const [showDetails, setShowCustomerDetails] = useState(location.state?.customer ? true : false);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState({ id: null, name: null });
    const [editableTotalPrice, setEditableTotalPrice] = useState(0);
    const [membershipDetail, setMembershipDetail] = useState("");
    const [isFirstTime, setIsFirstTime] = useState(location.state?.firstTime ? true : false);

    //get name data from register page

    const [customerName, setCustomerName] = useState("");

    // useEffect(() => {
    //     const params = new URLSearchParams(location.search);
    //     const firstname = params.get('firstname');
    //     if (firstname) {
    //         setCustomerName(firstname);
    //         setIsFirstTime(true);
    //     }
    //     console.log("first time? " + isFirstTime)
    // }, [location]);

    useEffect(() => {
        if (customerName && customerName.length > 1) {
            fetchOptions(customerName);
        }
    }, [customerName]);

    const fetchOptions = async (value) => {
        try {
            const response = await authFetch(`/api/v1/Customer?name=${value}`);
            console.log("data" + response);
            const data = await response.json();
            if (data && Array.isArray(data) && data.length > 0) {
                setCustomerSuggestions(data);
            } else {
                setCustomerSuggestions([
                    {
                        id: -1,
                        firstName: "No Existing Customer",
                        lastName: " - New Drop In",
                        email: "",
                    },
                ]);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setCustomerSuggestions([
                {
                    id: -2,
                    firstName: "Failed to",
                    lastName: " fetch customers data",
                    email: "",
                },
            ]);
        }
    };

    const debouncedFetchOptions = debounce(fetchOptions, 500);

    const handleNameInputChange = (e) => {
        const inputValue = e.target.value;
        setCustomerName(inputValue);
        console.log(inputValue);
        if (inputValue.length > 1) {
            debouncedFetchOptions(inputValue);
        } else if (inputValue.length == 0) {
            setCustomerSuggestions("");
        }
    };

    const navigate = useNavigate();

    const handleCustomerSuggestionClick = (customerSuggestion) => {
        if (customerSuggestion.id === -1) {
            setCustomerName("");
            navigate("/check/register");
        } else if (customerSuggestion.id === -2) {
            return
        }
        else {
            setSelectedCustomer(customerSuggestion);
            setShowCustomerDetails(true);
            setCustomerSuggestions([]);
            setCustomerName("");
            console.log(customerSuggestion);
        }
    };

    useEffect(() => {
        if (selectedCustomer !== null) {
            if (selectedCustomer.subEndDate) {
                const today = new Date();
                const subEndDate = new Date(selectedCustomer.subEndDate);
                if (today <= subEndDate) {
                    // if (selectedCustomer.passRemain && selectedCustomer.passRemain !== "unlimited") {
                    //     setMembershipDetail("Membership (expire on " + selectedCustomer.subEndDate + ", " + selectedCustomer.passRemain + " sessions remain)");
                    // } else {
                    setMembershipDetail("Membership (expire on " + selectedCustomer.subEndDate + ")");
                    setHasMembership(true);
                    // }
                } else {
                    setMembershipDetail("None");
                    setHasMembership(false);
                }
            } else {
                setMembershipDetail("None");
                setHasMembership(false);
            }
        } else {
            setMembershipDetail("None");
            setHasMembership(false);
        }
    }, [selectedCustomer]);

    const subscribe = () => {
        navigate(
            `/check/subscribe/${selectedCustomer.id}`,
        );
    };

    const handleSelectedActivities = (selected) => {
        setSelectedActivities(selected);
        console.log(selected);
    };

    const handleSelectedEvents = (selected) => {
        setSelectedEvents(selected);
        if (selected) {
            setHasMembership(false);
        }
        console.log(selected);
    };

    const handleSelectedPayment = (selected) => {
        setSelectedPayment(selected);
    };

    const handleBackClick = () => {
        setSelectedCustomer(null); // 清空选中的客户信息
        setShowCustomerDetails(false); // 隐藏会员详细信息
        setIsFirstTime(false);
    };

    const isCheckInEnabled =
        (selectedEvents.length > 0 || selectedActivities.length > 0) &&
        selectedPayment.id !== null;

    const handleCheckInClick = async () => {
        if (isCheckInEnabled) {
            const date = new Date();
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
            const formattedTime = `${date
                .getHours()
                .toString()
                .padStart(2, "0")}:${date
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
            const newCheckin = {
                date: formattedDate,
                time: formattedTime,
                customerId: selectedCustomer.id,
                payment: selectedPayment.name,
                activitiesId: selectedActivities.map((activity) => activity.id),
                eventId: selectedEvents.length > 0 ? selectedEvents[0].id : null,
                totalPrice: parseFloat(editableTotalPrice),
                isFirstTime: isFirstTime, // 这个值根据实际业务逻辑进行设置
            };
            try {
                const response = await authFetch("/api/v1/Checkin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newCheckin),
                });
                if (response.ok) {
                    console.log("Check-in successful:", await response.json());
                    alert(
                        selectedCustomer.firstName +
                        " " +
                        selectedCustomer.lastName +
                        " has been checked in! ",
                    );
                    navigate("/check/check-in", { state: { firstTime: false } });
                    handleBackClick();
                    window.location.reload();
                } else {
                    console.error("Failed to add check-in:", await response.text());
                }
            } catch (error) {
                console.error("Error while adding check-in:", error);
            }
        } else {
            console.error("Check-in failed: No events or payment selected");
        }
    };

    const calculateTotalPrice = () => {
        const activitiesPrice = selectedActivities.reduce(
            (sum, activity) => sum + (activity.price || 0),
            0,
        );
        const eventsPrice = selectedEvents.reduce(
            (sum, event) => sum + (event.price || 0),
            0,
        );
        let newTotalPrice;
        if (selectedPayment.id === 7) {
            newTotalPrice = 7.50;
        } else if (
            selectedPayment.id === 1 ||
            selectedPayment.id === 2 ||
            selectedPayment.id === 6 ||
            selectedPayment.id === 8
        ) {
            newTotalPrice = 0;
        } else {
            newTotalPrice = activitiesPrice + eventsPrice;
        }
        setEditableTotalPrice(newTotalPrice);
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedActivities, selectedEvents, selectedPayment.id]);

    return (
        <div className="form-group">
            {!showDetails && (
                <>
                    <label className="input-labels">Customer Name</label>
                    <input
                        type="text"
                        placeholder="2 letters or more"
                        onChange={handleNameInputChange}
                        value={customerName || ""}
                    />
                    {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.id}
                                    onClick={() => handleCustomerSuggestionClick(suggestion)}
                                >
                                    {suggestion.firstName} {suggestion.lastName} (
                                    {suggestion.email})
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

                        <label>First Name</label>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={selectedCustomer.firstName}
                            readOnly
                        />
                        <label>Last Name</label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={selectedCustomer.lastName}
                            readOnly
                        />
                        <label>Email</label>
                        <input
                            type="text"
                            placeholder="Email"
                            value={selectedCustomer.email}
                            readOnly
                        />
                        <label>Membership</label>
                        <input
                            type="text"
                            placeholder="Membership"
                            value={membershipDetail}
                            readOnly
                        />
                        <button className="tw-btn mb-4" onClick={subscribe}>
                            Buy Membership
                        </button>
                        <ActivitySelector onActivitySelect={handleSelectedActivities} />
                        <EventSelector onEventSelect={handleSelectedEvents} />
                        <PaymentSelector
                            onPaymentSelect={handleSelectedPayment}
                            hasMembership={hasMembership}
                        />
                        <label>Total Price</label>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <label>$</label>  {/* Reduced marginRight */}
                            <input
                                type="number"
                                className="total-price-input"
                                style={{ width: '100px', margin: '0' }} // Set specific width for the input
                                value={editableTotalPrice}
                                onChange={(e) => setEditableTotalPrice(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                    <span className="button-container">
                        <button className="tw-btn" onClick={handleBackClick}>
                            Back
                        </button>
                        <button
                            className={`tw-btn ${isCheckInEnabled ? "enabled" : "disabled"}`}
                            onClick={handleCheckInClick}
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