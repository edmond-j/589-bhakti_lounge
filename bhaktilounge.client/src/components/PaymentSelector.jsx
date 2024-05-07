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
            { id: 7, name: 'Devotee- $6 payment', selected: false },
            { id: 8, name: 'Devotee- no payment', selected: false }
        ];

        // 如果用户拥有会员资格，添加 Membership 选项
        if (hasMembership) {
            defaultPayments.unshift({ id: 1, name: 'Membership', selected: false });
        }

        setPayments(defaultPayments);
    }, [hasMembership]);

    const [showList, setShowList] = useState(false); // 状态控制下拉列表的显示

    const handleSelectPayment = (id) => {
        const updatedPayments = payments.map(payment => {
            return { ...payment, selected: payment.id === id ? !payment.selected : false };
        });
        setPayments(updatedPayments);
        const selectedPayment = updatedPayments.find((payment) => payment.selected);
        // 调用父组件的回调函数，传递所有选中的事件的ID数组
        onPaymentSelect(selectedPayment ? selectedPayment.id : null); // 传递单个ID或 null
    };

    const toggleList = () => {
        setShowList(!showList); // 切换列表显示状态
    };

    return (
        <div className="form-container">
            <label className="input-labels">Payments</label>
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
