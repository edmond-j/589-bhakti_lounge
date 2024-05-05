import { useState } from "react";
import styles from "./subscribe.module.css";
import Header from "../components/Header";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';


const isoDate = (date) => {
    return date.toISOString().substring(0,10);
}

function SubscriptionForm() {
    // function SubscriptionForm({ id, customerName, email }) {
    const { id,firstName,lastName,email } = useParams();
    const [subscription, setSubscription] = useState({ id });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/v1/MemberClass', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(resp => {
                resp.json().then(d => setProducts(d))                
            })
            .catch(err => console.log(err));
    }  , []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        let newSub = { ...subscription };
        newSub[name] = value;

        setSubscription(newSub);
    };

    const selectedSub = products.find((p) => p.id == subscription.memberClassId);
    let sessions = 0;
    let startDate = new Date();
    let endDate = new Date();
    if (selectedSub) {
        sessions = selectedSub.pass > 0 ? selectedSub.pass : "unlimited";
        endDate.setDate(endDate.getDate() + selectedSub.duration);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        const formData = {
            customerId: id,
            subStartDate: isoDate( startDate),
            subEndDate: isoDate( endDate),
            passRemain: selectedSub.pass,
        };

        try {
            const response = await fetch('/api/v1/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {

                console.log('Subscription successful', await response.json());
            } else {

                throw new Error('Failed to submit subscription');
            }
        } catch (error) {
            console.error('Error submitting subscription:', error);
        }
    };


    return (
        <div className={styles.subscriptionform}>
            <Header />
            <main>
                <h3>Renew subscription for {firstName}  {lastName} </h3>
                <form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <div className='sbscriptionformContent'>
                        <label>
                            Email: <div>  {email}</div>
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
