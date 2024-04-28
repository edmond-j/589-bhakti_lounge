import { useState } from 'react';
import './App.css';

function PaymentSelector({ onPaymentSelect }) {

    // const [payments, setPayments] = useState([]); // 初始化为空数组
    // // 假设 fetchData 是一个异步函数，用来从后端获取数据
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // 此处以一个假设的API调用替代
    //             const response = await fetch('https://your-api-url.com/api/customers');
    //             const data = await response.json();
    //             setPayments(data);
    //         } catch (error) {
    //             console.error('Failed to fetch data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []); // 空依赖数组表示此effect只在组件挂载时运行一次

    // 直接定义 options 为一个数组

    const [payments, setPayments] = useState([
        { id: 1, name: 'Membership', selected: false },
        { id: 2, name: 'Cash', selected: false },
        { id: 3, name: 'Card', selected: false },
        { id: 4, name: 'Online bank transfer', selected: false },
        { id: 5, name: 'Service Exchange', selected: false },
        { id: 6, name: 'Devotee- $6 payment', selected: false },
        { id: 7, name: 'Devotee- no payment', selected: false }
    ]);

    const [showList, setShowList] = useState(false); // 状态控制下拉列表的显示

    const handleSelectPayment = (id) => {
        const updatedPayments = payments.map(payment => {
            return { ...payment, selected: payment.id === id ? !payment.selected : false };
        });
        setPayments(updatedPayments);
        const selectedPayment = updatedPayments.filter(payment => payment.selected).map(payment => payment.id);
        // 调用父组件的回调函数，传递所有选中的事件的ID数组
        onPaymentSelect(selectedPayment);
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
