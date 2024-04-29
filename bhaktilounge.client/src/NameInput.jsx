// import { useState } from 'react';
// import './App.css';
// import EventSelector from './EventSelector';

// export default function NameInput({ onCustomerSelect }) {
//     const [customerName, setCustomerName] = useState('');
//     const [suggestions, setSuggestions] = useState([]);
//     const [selectedCustomer, setSelectedCustomer] = useState(null);
//     const [showDetails, setShowDetails] = useState(false);

//     // const [options, setOptions] = useState([]); // 初始化为空数组
//     // // 假设 fetchData 是一个异步函数，用来从后端获取数据
//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         try {
//     //             // 此处以一个假设的API调用替代
//     //             const response = await fetch('https://your-api-url.com/api/customers');
//     //             const data = await response.json();
//     //             setOptions(data);
//     //         } catch (error) {
//     //             console.error('Failed to fetch data:', error);
//     //         }
//     //     };

//     //     fetchData();
//     // }, []); // 空依赖数组表示此effect只在组件挂载时运行一次

//     // 直接定义 options 为一个数组
//     const options = [
//         { id: 1, firstName: 'Violet', lastName: 'Zhang', email: '123@gmail.com' },
//         { id: 2, firstName: 'Vivian', lastName: 'Law', email: '456@hotmail.com' },
//         { id: 3, firstName: 'Henry', lastName: 'Birt', email: '789@foxmail.com' }
//     ];

//     const handleInputChange = (e) => {
//         const value = e.target.value.toLowerCase();
//         setCustomerName(value);
//         if (value.length > 0) {
//             const filteredSuggestions = options.filter(option =>
//                 option.firstName.toLowerCase().includes(value) || option.lastName.toLowerCase().includes(value)
//             );
//             if (filteredSuggestions.length > 0) {
//                 setSuggestions(filteredSuggestions);
//             } else {
//                 setSuggestions([{ id: 0, firstName: "No Existing Customer", lastName: " - New Drop In", email: "" }]); // 当没有匹配项时添加
//             }
//         } else {
//             setSuggestions([]);
//         }
//     };

//     const handleSuggestionClick = (suggestion) => {
//         if (suggestion.id === 0) {
//             // 重定向到新会员注册页面
//             window.location.href = "/new-customer";
//         } else {
//             setSelectedCustomer(suggestion);
//             setShowDetails(true);            // 显示会员详细信息
//             setSuggestions([]);  // 清空建议列表
//         }
//     };


//     return (
//         <div className="form-container" >
//             {!showDetails && (
//                 <>
//                     <label className="input-labels">Customer Name</label>
//                     <input
//                         type="text"
//                         placeholder="Customer Name"
//                         value={customerName}
//                         onChange={handleInputChange}
//                     />
//                     {suggestions.length > 0 && (
//                         <ul className="suggestions-list">
//                             {suggestions.map((suggestion) => (
//                                 <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
//                                     {suggestion.id === 0 ? (
//                                         <span className="new-customer">{`${suggestion.firstName} ${suggestion.lastName}`}</span>
//                                     ) : (
//                                         `${suggestion.firstName} ${suggestion.lastName} (${suggestion.email})`
//                                     )}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </>
//             )}
//             {showDetails && selectedCustomer && (
//                 <>
//                     <div className="customer-details">
//                         <h2>Existing Customer</h2>

//                         <label className="input-labels">First Name</label>
//                         <input
//                             type="text"
//                             placeholder="First Name"
//                             value={selectedCustomer.firstName}
//                             readOnly
//                         />

//                         <label className="input-labels">Last Name</label>
//                         <input
//                             type="text"
//                             placeholder="Last Name"
//                             value={selectedCustomer.lastName}
//                             readOnly
//                         />

//                         <label className="input-labels">Email</label>
//                         <input
//                             type="text"
//                             placeholder="Last Name"
//                             value={selectedCustomer.email}
//                             readOnly
//                         />

//                         <label className="input-labels">Membership</label>
//                         <input
//                             type="text"
//                             placeholder="Membership"
//                             value={selectedCustomer.id}
//                             readOnly
//                         />
//                         {/* 你可以在这里添加更多详细信息，如会员状态等 */}
//                         <EventSelector />
//                     </div>
//                     <span className='line-buttons'>
//                         <button className='button-class' onClick={handleBackClick}>Back</button>
//                         <button className='button-class'>CheckIn</button>
//                     </span>

//                 </>
//             )}

//         </div>
//     );
// }
