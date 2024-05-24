import React, { useState } from "react";
import { toast } from "react-toastify";
import authFetch from "@/utils/authFetch.js";

function UserSignupPanel({populateData}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("Staff");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
    const handleTypeChange = (e) => setRole(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Error: Passwords do not match");
            return;
        }
        const userData = {
            username,
            password,
            role,
        };
        try {
            const response = await authFetch("/api/v1/Auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                //response.ok不可靠
                toast.success("New user has been added!");
                setUsername("");
                setPassword("");
                setConfirmPassword("");
                setRole("Staff");
                populateData()
                // setUsers((prevItems) => [...prevItems, newUser]);
                //更新表格，返回名字、role、id
            } else {
                const errorData = await response.json();
                if (Array.isArray(errorData)) {
                    const errorDescriptions = errorData.map((error) => error.description);
                    const errorMessage = errorDescriptions.join("\n");
                    alert("Error:\n" + errorMessage);
                }
                // alert("Failed to register: ");
            }
        } catch (error) {
            console.log(error);
            alert("Failed to register", error);
        }
    };

    return (
        <div className="flex flex-col mx-12 my-6">
            <div className="grid grid-cols-2 gap-x-12 min-w-max">
                <div className="min-w-max">
                    <label htmlFor="username">User Name</label>
                    <input className="tw-input" type="text" id="username" value={username} onChange={handleUsernameChange} />
                </div>

                <div className="min-w-max">
                    <label htmlFor="password">Password</label>
                    <input className="tw-input" type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>

                <div className="min-w-max">
                    <label htmlFor="role">Role</label>
                    <select id="role" className="tw-input" value={role} onChange={handleTypeChange}>
                        <option value="Manager">Manager</option>
                        <option value="Staff">Staff</option>
                    </select>
                </div>

                <div className="min-w-max">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input className="tw-input" type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>
            </div>
            <div className="flex">
                <button className="tw-btn" onClick={handleSubmit}>
                    Add
                </button>
            </div>
        </div>
    );
}

export default UserSignupPanel;
