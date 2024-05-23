import { useState } from "react";
// import styles from "./subscribe.module.css";
import logo from "/logo.jpg";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authFetch from "@/utils/authFetch.js";

const isoDate = (date) => {
    return date.toISOString().substring(0, 10);
};

function SubscriptionForm() {
    // function SubscriptionForm({ id, customerName, email }) {
    const { id } = useParams();
    const [subscription, setSubscription] = useState({ id });
    const [customer, setCustomer] = useState();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        authFetch("/api/v1/MemberClass", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                resp.json().then((d) => setProducts(d));
            })
            .catch((err) => console.log(err));

        authFetch(`/api/v1/Customer/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                resp.json().then((customer) => {
                    if (customer) {
                        setCustomer(customer);
                    }
                });
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSubscription((prevSubscription) => ({
            ...prevSubscription,
            [name]: value,
        }));
    };

    const handleBackToCheckin = () => {
        customer.subEndDate = endDate.toLocaleDateString();
        setCustomer(customer);
        navigate("/check/check-in", { state: { customer } });
    };

    const selectedSub = products.find((p) => p.id == subscription.memberClassId);
    // let sessions = 0;

    let today = new Date();
    let startDate = customer && customer.subEndDate && new Date(customer.subEndDate) > today ? new Date(customer.subStartDate) : today;
    let endDate = customer && customer.subEndDate && new Date(customer.subEndDate) > today ? new Date(customer.subEndDate) : today;

    if (selectedSub) {
        console.log(startDate, subscription)
        // sessions = selectedSub.pass > 0 ? selectedSub.pass : "unlimited";
        endDate.setDate(endDate.getDate() + selectedSub.duration);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            customerId: id,
            subStartDate: isoDate(startDate),
            subEndDate: isoDate(endDate),
            passRemain: selectedSub.pass,
        };

        try {
            const response = await authFetch("/api/v1/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Subscription successful", await response.json());
                handleBackToCheckin();
            } else {
                throw new Error("Failed to submit subscription");
            }
        } catch (error) {
            console.error("Error submitting subscription:", error);
        }
    };

    return (
        <>
            <img src={logo} alt="BHAKTI Lounge Logo" className="Header-logo" />
            <main>
                <h2>Renew Membership</h2>
                {customer &&
                    <h3>
                        for: {customer.firstName} {customer.lastName}{" "}
                    </h3>
                }
                <form
                    className="form-group"
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <div className="sbscriptionformContent">
                        <label>
                            Select Membership Type
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
                            <label className="label2">
                                {/* <b>{sessions}</b> sessions{" "}
                                {sessions === "unlimited" && <b>except </b>} */}
                                Membership Valid until <b>{endDate.toLocaleDateString()}</b>
                            </label>
                        )}

                        {selectedSub && (
                            <p style={{ fontSize: "" }}>${selectedSub.price} to be paid</p>
                        )}
                    </div>

                    <div className="button-container" style={{ alignItems: "center" }}>
                        <button
                            className="tw-btn"
                            type="button"
                            onClick={handleBackToCheckin}
                        >
                            Back
                        </button>
                        <button className="tw-btn" type="submit">
                            Confirm
                        </button>
                    </div>

                </form>
            </main>
            <footer>©Bhakti Lounge - Check-in</footer>
        </>
    );
}

export default SubscriptionForm;