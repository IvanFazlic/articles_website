import Link from "next/link";
import Image from "next/image";
import logo from "public/logo.png"

export default function HeaderComponent() {
    return (
      <Link href="/">
        <div style={{backgroundColor:"#F4F4F4",display:"flex", justifyContent:"center", border:"1px solid gray"}}>
            <Image style={{maxHeight:"50px", maxWidth:"50px", textAlign:"center"}} src={logo} alt="logo_image"></Image>
        </div>
      </Link>
    );
}