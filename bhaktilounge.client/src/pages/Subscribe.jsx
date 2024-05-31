import { useState } from "react";
// import styles from "./subscribe.module.css";
import logo from "/logo.jpg";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authFetch from "@/utils/authFetch.js";

const isoDate = (date) => {
    return date.getFullYear() + '-' + 
    String(date.getMonth() + 1).padStart(2, '0') + '-' + 
    String(date.getDate()).padStart(2, '0');
};

function SubscriptionForm() {
    // function SubscriptionForm({ id, customerName, email }) {
    const { id } = useParams();
    const [subscription, setSubscription] = useState({ id });
    const [customer, setCustomer] = useState();
    const [products, setProducts] = useState([]);
    const [inputStartDate, setInputStartDate] = useState("");
    const [inputEndDate, setInputEndDate] = useState("");
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
                        setInputStartDate(customer.subStartDate || "");
                        setInputEndDate(customer.subEndDate || "");
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
        if (name === "memberClassId") {
            const selectedSub = products.find((p) => p.id == value);
            if (selectedSub && customer) {
                let today = new Date();
                let startDate = new Date();
                let endDate = new Date();
                if (new Date(customer.subEndDate) > today) {
                    // 如果已有的订阅结束日期大于今天，则在其基础上增加
                    startDate = new Date(customer.subStartDate);
                    endDate = new Date(customer.subEndDate);
                    endDate.setDate(endDate.getDate() + selectedSub.duration);
                } else {
                    // 否则，从今天开始新的订阅
                    endDate.setDate(today.getDate() + selectedSub.duration);
                }
                setInputStartDate(isoDate(startDate));
                setInputEndDate(isoDate(endDate));
            }
        }
    };

    const selectedSub = products.find((p) => p.id == subscription.memberClassId);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("start", inputStartDate);
        const formData = {
            id: id,
            subStartDate: inputStartDate,
            subEndDate: inputEndDate,
            passRemain: selectedSub.pass + customer.passRemain,
        };
        console.log("Form Data:", formData);
        try {
            const response = await authFetch("/api/v1/Customer", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                customer.subStartDateDate = inputStartDate;
                customer.subEndDate = inputEndDate;
                setCustomer(customer);
                console.log("customer.subEndDate", customer.subEndDate);
                navigate("/check/check-in", { state: { customer } });
                toast.success("Membership Updated Successfully");
            } else {
                throw new Error("Failed to submit subscription");
            }
        } catch (error) {
            console.error("Error submitting subscription:", error);
        }
    };

    return (
        <>
            <main>
                <div className="flex justify-center">
                    <img src={logo} alt="BHAKTI Lounge Logo" className="Header-logo" />
                    <h2>Renew Membership</h2>
                </div>
                {customer && (
                    <div className="flex flex-col w-3/5 mx-auto">
                        <p>Membership Details</p>
                        <div className="flex justify-between my-1">
                            <p className="font-semibold text-base">Name:</p>
                            <p className="text-base">
                                {customer.firstName} {customer.lastName}
                            </p>
                        </div>
                        <div className="flex justify-between my-1">
                            <p className="font-semibold text-base">Email:</p>
                            <p className="text-base">{customer.email}</p>
                        </div>
                        <div className="flex justify-between my-1">
                            <p className="font-semibold text-base">Start Date:</p>
                            <p className="text-base">{customer.subStartDate ? customer.subStartDate : "N/A"}</p>
                        </div>
                        <div className="flex justify-between my-1">
                            <p className="font-semibold text-base">End Date:</p>
                            <p className="text-base">{customer.subEndDate ? customer.subEndDate : "N/A"}</p>
                        </div>
                        <hr className="my-4" />
                    </div>
                )}
                <form className="form-group" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                    <div className="sbscriptionformContent">
                        <label>
                            Add Membership
                            <select className="tw-input" name="memberClassId" value={subscription.memberClassId} onChange={handleInputChange}>
                                <option></option>
                                {products.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.duration ? p.name + ": " + p.duration + " days" : p.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {selectedSub && (
                            <>
                                <label htmlFor="date">Renewed End Date</label>
                                <input className="tw-input" type="date" id="date" value={inputEndDate} onChange={(e) => setInputEndDate(e.target.value)} />
                            </>
                        )}

                        {selectedSub && <h3 className="mt-6 font-semibold">Price: ${selectedSub.price}</h3>}
                    </div>

                    <div className="button-container" style={{ alignItems: "center" }}>
                        <button className="tw-btn" type="button" onClick={() => navigate("/check/check-in", { state: { customer } })}>
                            Back
                        </button>
                        <button className="tw-btn" type="submit">
                            Confirm
                        </button>
                    </div>
                </form>
            </main>
            {/* <footer>©Bhakti Lounge - Check-in</footer> */}
        </>
    );
}

export default SubscriptionForm;
