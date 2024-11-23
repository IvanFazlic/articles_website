'use client';
import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import submitTicket from './submitTicket';
import { redirect } from "next/navigation";

export default function Ticket() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [isCaptchaVerified, setCaptchaVerified] = useState(false);

    // Use ref to keep track of the form element
    const formRef = useRef<HTMLDivElement | null>(null);

    const toggleForm = () => {
        setFormVisible(!isFormVisible);
    };

    const handleCaptchaChange = (value: any) => {
        setCaptchaVerified(!!value); 
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!isCaptchaVerified) {
            alert("Please complete the CAPTCHA before submitting!");
            return;
        }
        
        const email = document.getElementById("email") as HTMLInputElement | null;
        const description = document.getElementById("description") as HTMLTextAreaElement | null;

        let res = false;

        if (email && description) {
            res = await submitTicket(email.value, description.value);
        }

        if (res) {
            alert("Form submitted successfully!");
        } else {
            alert("Error submitting form!");
        }

        // Close the form after submission
        setFormVisible(false);
        
        // Optionally, you can redirect if needed:
        redirect('/'); // This will reload the page and navigate to home
    };

    // Close the form when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setFormVisible(false); // Close the form if clicked outside
            }
        };

        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div style={{ position: "relative" }}>
            {/* Ticket Button */}
            <button
                onClick={toggleForm}
                style={{
                    padding: "10px 20px",
                    cursor: "pointer",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                }}
            >
                Ticket
            </button>

            {/* Form Box */}
            {isFormVisible && (
                <div
                    ref={formRef} // Assign the form element to the ref
                    style={{
                        position: "absolute",
                        top: "100%", // Position below the ticket
                        right: 0,
                        marginTop: "10px",
                        width: "350px", // Wider form
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #CCC",
                        borderRadius: "5px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        padding: "20px",
                        zIndex: 100,
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "10px" }}>
                            <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    border: "1px solid #CCC",
                                    borderRadius: "4px",
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label htmlFor="description" style={{ display: "block", marginBottom: "5px" }}>
                                Description:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    border: "1px solid #CCC",
                                    borderRadius: "4px",
                                    minHeight: "80px",
                                }}
                            ></textarea>
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <ReCAPTCHA
                                sitekey="6LfE84cqAAAAALcrzA-pdXuPQtOXT2TCNUoKp3ap" // Replace with your reCAPTCHA site key
                                onChange={handleCaptchaChange}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: "#007BFF",
                                color: "white",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
