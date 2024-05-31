import { useEffect, useState } from 'react';

function PaymentSelector({ onPaymentSelect, hasMembership }) {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const defaultPayments = [
            { id: 2, name: 'Class Pass', selected: false },
            { id: 3, name: 'Cash', selected: false },
            { id: 4, name: 'Card', selected: false },
            { id: 5, name: 'Online bank transfer', selected: false },
            { id: 6, name: 'Service Exchange', selected: false },
            { id: 7, name: 'Devotee - $7.50 payment', selected: false },
            { id: 8, name: 'Devotee - no payment', selected: false }
        ];

        if (hasMembership) {
            defaultPayments.unshift({ id: 1, name: 'Membership', selected: false });
        }

        setPayments(defaultPayments);
    }, [hasMembership]);

    const [showList, setShowList] = useState(false);

    const handleSelectPayment = (id) => {
        const updatedPayments = payments.map(payment => {
            return { ...payment, selected: payment.id === id ? !payment.selected : false };
        });
        setPayments(updatedPayments);
        const selectedPayment = updatedPayments.find((payment) => payment.selected);

        onPaymentSelect(selectedPayment ? selectedPayment : { id: null, name: null });
    };

    const toggleList = () => {
        setShowList(!showList); // 切换列表显示状态
    };

    return (
        <div className="form-group">
            <label>Payments</label>
            <input
                htmlFor="payments"
                type="text"
                value={"Select Payments ▼"}
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