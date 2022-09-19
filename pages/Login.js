import Link from "next/link";
import NavL from "../Components/Navbar/navLogin";
export default function Login() {
    return (
      <div>
        {/* <h1>Login</h1> */}
        <NavL/>
          <Link href="/Register/Register"><p>สมัครบัญชีใหม่</p></Link>

      </div>
    );
  }
