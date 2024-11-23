import Link from "next/link";
import Image from "next/image";
import logo from "public/Perpetual.png";
import Ticket from "./ticket";

export default function HeaderComponent() {
    return (
        <div
            style={{
                backgroundColor: "#F4F4F4",
                display: "flex",
                justifyContent: "space-between", // Space between items
                alignItems: "center", // Center items vertically
                padding: "0 20px", // Add padding for better spacing
                border: "1px solid gray",
                position: "sticky",
                top: 0,
                zIndex: 1000,
            }}
        >
            {/* Left Placeholder for alignment purposes */}
            <div style={{ flex: 1 }}></div>

            {/* Centered Logo */}
            <Link href="/">
                <div style={{ textAlign: "center" }}>
                    <Image
                        style={{
                            minHeight: "50px",
                            maxHeight: "50px",
                        }}
                        src={logo}
                        alt="logo_image"
                    />
                </div>
            </Link>

            {/* Right-aligned Ticket */}
            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" , marginRight:"40px"}}>
                <Ticket />
            </div>
        </div>
    );
}
