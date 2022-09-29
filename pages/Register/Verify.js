import Link from "next/link";
import React from "react";

const VerifyRequest = () => {
  return (
    <div>
      <h1>Check your email</h1>
      <h2>A Sign in link has been sent too your email address.</h2>
      <Link href="/">
        <a>Go back to homepage</a>
      </Link>
    </div>
  );
}
export default VerifyRequest