import { useState } from "react";
import styles from "./subscribe.module.css";
import Header from "../components/Header";

const products = [
    { id: 1, name: "1 Month Pass", duration: 30, price: 249 },
    { id: 2, name: "3 Month Pass", duration: 90, price: 449 },
    { id: 3, name: "6 Month Pass", duration: 180, price: 749 },
    { id: 4, name: "10 Sessions", sessions: 10, duration: 60, price: 300},
];

function SubscriptionForm({ customerId }) {
    // function SubscriptionForm({ id, customerName, email }) {

    const [subscription, setSubscription] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        let newSub = { ...subscription };
        newSub[name] = value;

        setSubscription(newSub);
    };
    const handleSubmit = () => "";

    const selectedSub = products.find((p) => p.id == subscription.memberClassId);
    let sessions = 0;
    let endDate = new Date();
    if (selectedSub) {
        sessions = selectedSub.sessions ? selectedSub.sessions : "unlimited";
        endDate.setDate(endDate.getDate() + selectedSub.duration);
    }

    return (
        <div className={styles.subscriptionform}>
            <Header />
            <main>
                <h3>Membership Subscribe</h3>
                <form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <div className='sbscriptionformContent'>
                    <label>
                        Name
                        <input
                            type="text"
                            name="customerName"
                            value={subscription.customerName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={subscription.email}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Membership
                        <select
                            name="memberClassId"
                            value={subscription.memberClassId}
                            onChange={handleInputChange}
                        >
                            <option></option>
                            {products.map((p) => {
                                return (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                );
                            })}
                        </select>
                    </label>

                    {selectedSub && (
                        <label>
                            {sessions} sessions except Thursdays until {endDate.toDateString()}
                        </label>
                    )}

                    {selectedSub && (
                        <p style={{ fontSize: "" }}>
                            ${selectedSub.price} to be paid 
                        </p>
                        )}
                 </div>

                    <div style={{ alignItems: "center" }}>
                        <div className={styles.subscriptionform}>
                            <button type="button">Back</button>
                            <button type="submit">Confirm</button>
                        </div>
                    </div>
                </form>
            </main>
            <footer>©Bhakti Lounge - Check-in</footer>
        </div>
    );
}

export default SubscriptionForm;
