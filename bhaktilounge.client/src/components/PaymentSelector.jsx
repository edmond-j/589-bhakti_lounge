import { useEffect, useState } from 'react';
import authFetch from "@/utils/authFetch.js";


function PaymentSelector({ onPaymentSelect, hasMembership }) {
    const [payments, setPayments] = useState([]);
    const [placeholder, setPlaceholder] = useState("Select Payments ▼");
    useEffect(() => {
        const fetchPayments = async () => {
            //const defaultPayments = [
            //    { id: 2, name: 'Class pass', fixedPriceEnabled: true, fixedPrice: 0, deuctEnabled: false, deduct: null, discountEnabled: false, discount: null, selected: false },
            //    { id: 3, name: 'Cash', fixedPriceEnabled: false, fixedPrice: null, deuctEnabled: false, deduct: null, discountEnabled: false, discount: null, selected: false },
            //    { id: 4, name: 'Card', fixedPriceEnabled: false, fixedPrice: null, deuctEnabled: false, deduct: null, discountEnabled: false, discount: null, selected: false },
            //    { id: 5, name: 'Online bank transfer', fixedPriceEnabled: false, fixedPrice: null, deuctEnabled: false, deduct: null, discountEnabled: false, discount: null, selected: false },
            //    { id: 6, name: 'Service exchange', fixedPriceEnabled: true, fixedPrice: 0, deuctEnabled: false, deduct: null, discountEnabled: false, discount: null, selected: false },
            //    { id: 7, name: 'Devotee - $7.50 payment', fixedPriceEnabled: true, fixedPrice: 7.5, deuctEnabled: false, deduct: null, discountEnabled: false, discount: null, selected: false },
            //    { id: 8, name: 'Devotee - no payment', fixedPriceEnabled: true, fixedPrice: 0, deuctEnabled: false, deduct: null, discountEnabled: false, discount: null, selected: false },
            //    { id: 9, name: 'Using Momo 10 trip', fixedPriceEnabled: true, fixedPrice: 0, deuctEnabled: false, deduct: null, discountEnabled: false, discount: null, selected: false },
            //    { id: 10, name: 'Pre-paid online ticket', fixedPriceEnabled: true, fixedPrice: 0, deuctEnabled: false, deduct: null, discountEnabled: false, discount: null, selected: false },
            //    { id: 11, name: 'Voucher - September', fixedPriceEnabled: true, fixedPrice: 0, deuctEnabled: false, deduct: null, discountEnabled: false, discount: null, selected: false },
            //    { id: 12, name: 'Sankirtan flyer-free first time', fixedPriceEnabled: true, fixedPrice: 0, deuctEnabled: false, deduct: null, discountEnabled: false, discount: null, selected: false },
            //    { id: 13, name: 'Free pass', fixedPriceEnabled: true, fixedPrice: 0, deuctEnabled: false, deduct: null, discountEnabled: false, discount: null, selected: false },
            //    { id: 14, name: '50%', fixedPriceEnabled: false, fixedPrice: null, deuctEnabled: false, deduct: null, discountEnabled: true, discount: 0.5, selected: false }
            //];

            const response = await authFetch("/api/v1/payment"); 
            console.log(response)
            const data = await response.json();

            const defaultPayments = data.map(payment => ({
                ...payment,
                selected: false
            }));

            if (hasMembership) {
                defaultPayments.unshift({ id: 1, name: 'Membership', fixedPriceEnabled: true, fixedPrice: 0, deuctEnabled: false, deduct: null, discountEnabled: false, discount: null, selected: false });
            }

            setPayments(defaultPayments);
        }
        fetchPayments();
    }, [hasMembership]);

    const [showList, setShowList] = useState(false);

    const handleSelectPayment = (id) => {
        const updatedPayments = payments.map(payment => {
            return { ...payment, selected: payment.id === id ? !payment.selected : false };
        });
        setPayments(updatedPayments);
        const selectedPayment = updatedPayments.find((payment) => payment.selected);
        onPaymentSelect(selectedPayment ? selectedPayment : { id: null, name: null });
        setPlaceholder(selectedPayment.name);
        setShowList(!showList);
    };

    const toggleList = () => {
        setShowList(!showList);
    };

    return (
        <div className="form-group">
            <label>Payments</label>
            <input
                htmlFor="payments"
                type="text"
                value={placeholder}
                readOnly
                onClick={toggleList}
            />
            {showList && (
                <ul className="suggestions-list">
                    {payments.map((payment) => (
                        <li key={payment.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={payment.selected}
                                    onChange={() => handleSelectPayment(payment.id)}
                                />
                                {payment.name}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PaymentSelector;