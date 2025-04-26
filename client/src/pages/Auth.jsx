import React from "react";
import Form from "../components/Form";

function SignUpPage() {
  return (
    <div className="h-5/6">
      <Form isSignUp={true}  />
    </div>
  );
}

function LoginPage() {
  return (
    <div className="h-5/6">
      <Form isSignUp={false}  />
    </div>
  );
}

export { SignUpPage, LoginPage };
