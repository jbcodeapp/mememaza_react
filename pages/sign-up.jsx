import React from "react";
import { useState } from "react";
import Link from "next/link";

import AuthLayout from "@/layouts/AuthLayout";
import styles from "@/styles/pages/register.module.css";
import axios from "axios";
import toastr from "toastr";

import { SITE_URL } from "@/def";
import { useRouter } from "next/navigation";

export default function Register() {
  const [remail, setRemail] = useState("");
  const [rname, setRname] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [registerDisabled, setRegisterDisabled] = useState("");

  const [registerErr, setRegisterErr] = useState([]);

  const router = useRouter();

  async function registerAction(body) {
    setRegisterDisabled("disabled");
    try {
      let statelist = await axios.post(SITE_URL + "/register", body);
      if (statelist.data.statuscode == true) {
        setRegisterDisabled("");
        router.push("/sign-in");
        toastr.success(statelist.data.message, "MemeMaza Register");
        setModalLoginForm("");
        setRegisterErr([]);
      } else {
        setRegisterErr(statelist.data.errors);
        setRegisterDisabled("");
      }
    } catch (err) {
      setRegisterDisabled("");
    }
  }

  function register(event) {
    const body = { name: rname, email: remail, password: rpassword };
    registerAction(body);
    event.preventDefault();
  }

  return (
    <AuthLayout title="Sign Up">
      <div className={styles.register}>
        <form onSubmit={register}>
          {registerErr.map((regErr, regErri) => (
            <div key={regErr}>
              <span style={{ color: "#ff4f4f" }}>{regErr}</span>
              <br />
            </div>
          ))}

          <div className="col-md-12">
            <div className="col-md-12">
              <label htmlFor="exampleInputEmail1">Name</label>
              <input
                type="text"
                placeholder="Name"
                value={rname}
                onChange={(e) => setRname(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={remail}
                onChange={(e) => setRemail(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="col-md-12">
              <label htmlFor="exampleInputEmail1">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={rpassword}
                onChange={(e) => setRpassword(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-12" style={{ marginTop: 24 }}>
            <input
              type="submit"
              disabled={registerDisabled}
              className="btn btn-primary"
              value="Register"
            />
          </div>
          <p className={styles.footerText}>
            Already have an account? <Link href="/sign-in">Sign in</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
