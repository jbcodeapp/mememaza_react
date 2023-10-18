import Link from "next/link";
import React, { useState } from "react";
import AuthLayout from "@/layouts/AuthLayout";

import { useAppDispatch, useAppSelector } from "@/src/store";
import {
  authSelect,
  authUserSelect,
  postSignIn,
} from "@/src/services/auth/slice";

import styles from "@/styles/pages/login.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [lemail, setLemail] = useState("");
  const [lpassword, setLpassword] = useState("");

  const dispatch = useAppDispatch();
  const { pageState, message, error } = useAppSelector(authSelect);
  const user = useAppSelector(authUserSelect);
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      console.log(user);
      router.push("/");
    }
  }, [user]);

  async function loginAction(body) {
    try {
      dispatch(postSignIn(body));
      toastr.success(message, "MemeMaza Login");
    } catch (err) {}
  }
  function login(event) {
    const body = { email: lemail, password: lpassword };

    loginAction(body);

    event.preventDefault();
  }

  return (
    <AuthLayout title="Sign In">
      <div className={styles.login}>
        <form onSubmit={login}>
          {typeof error === "array" ? (
            error?.map((loginErr) => (
              <>
                <span style={{ color: "#ff4f4f" }}>{loginErr}</span>
                <br />
              </>
            ))
          ) : (
            <>
              <span style={{ color: "#ff4f4f" }}>{error}</span>
              <br />
            </>
          )}

          <div className="col-md-12">
            <div className="col-md-12">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={lemail}
                onChange={(e) => setLemail(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="col-md-12">
              <label htmlFor="exampleInputEmail1">Password</label>
              <input
                type="password"
                placeholder="password"
                value={lpassword}
                onChange={(e) => setLpassword(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-12">
            <br />
            <input
              type="submit"
              disabled={pageState == "loading"}
              className="btn btn-primary"
              value="Login"
            />
            <p className={styles.footerText}>
              Don't have an account? <Link href="/sign-up">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
