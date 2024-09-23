'use client'
import { login, signup, loginWithOAuth } from './actions'
import styles from '@/styles/logIn.module.css'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordMismatchMessage, setPasswordMismatchMessage] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpperCase && hasLowerCase && hasDigits && hasSpecialChar;
  };

  useEffect(() => {
    const { firstName, lastName, email, username, password, confirmPassword } = signUpData;
    const isValid =
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      email.trim() !== '' &&
      username.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      password === confirmPassword &&
      validatePassword(password);

    setIsFormValid(isValid);
  }, [signUpData]);

  useEffect(() => {
    const { password, confirmPassword } = signUpData;

    if (password.trim() === '' || confirmPassword.trim() === '') {
      setPasswordMismatchMessage(null);
    } else if (password !== confirmPassword) {
      setPasswordMismatchMessage('Passwords do not match.');
    } else if (!validatePassword(password)) {
      setPasswordMismatchMessage('Password must contain at least one lowercase, one uppercase, one digit, and one symbol.');
    } else {
      setPasswordMismatchMessage(null);
    }
  }, [signUpData.password, signUpData.confirmPassword]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const result = await login(formData);
      if (result?.error) {
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
  
    if (!isFormValid) {
      setErrorMessage('Please fill all fields correctly.');
      return;
    }
  
    const formData = new FormData();
    Object.entries(signUpData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    try {
      const result = await signup(formData);
      if (result?.error) {
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('An unexpected error occurred during signup.');
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await loginWithOAuth()
    } catch (error) {
      console.error("Error during GitHub login:", error)
    }
  }

  const handleToggle = () => {
    setIsSignUp(!isSignUp)
  }

  const handleSignUpInputChange = (e) => {
    const { name, value } = e.target
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <div className={styles.container}>
      {errorMessage && <div className={styles.alert}>{errorMessage}</div>}
      {passwordMismatchMessage && <div className={styles.passwordAlert}>{passwordMismatchMessage}</div>}
               
      <div className={`${styles.card} ${isSignUp ? styles.rotate : ''}`}>
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>
            <div className={styles.leftPanel}>
              <h1 className={styles.headingPrimary}>JOBHILL</h1>
              <h2 className={styles.headingSecondary}>Welcome Back!</h2>

              <form className={styles.form}  onSubmit={handleLoginSubmit} >
                <label htmlFor="email" className={styles.label}>Email</label>
                <input id="email" type="email" name="email" placeholder="Enter your email" className={styles.input} required />

                <label htmlFor="password" className={styles.label}>Password</label>
                <input id="password" name="password" type="password" placeholder="Minimum 8 characters with a number" className={styles.input} required />

                <div className={styles.forgotPassword}>
                  <a href="#" className={styles.forgotPasswordLink}>FORGOT PASSWORD?</a>
                </div>

                <button type="button" onClick={handleGitHubLogin} className={styles.githubLogin}>Log In with GitHub</button>

                <button type="submit" className={styles.loginBtn}>Log in</button>
              </form>
            </div>
            <div className={styles.rightPanel}>
              <h2 className={styles.headingSecondary3}>NEW HERE?</h2>
              <p className={styles.create}>Create an account to keep track of your applications</p>
       
              <Image className={styles.logo} src="/Images/Jobmiga_Sign.png" width={300} height={300} alt="Jobhill logo 1" />
                
              <button type="button" onClick={handleToggle} className={styles.signinBtn}>Sign Up</button>
            </div>
          </div>

          <div className={styles.cardBack}>
            <div className={styles.leftPanel2}>
              <h2 className={styles.headingPrimary2}>ALREADY A USER?</h2>
              <p className={styles.create2}>Log back, to see your applications</p>
              <Image className={styles.logo} src="/Images/Jobmiga_Log.png" width={280} height={280} alt="Jobhill logo 1" />
              
              <button type="button" onClick={handleToggle} className={styles.loginBtn2}>Log In</button>
            </div>

            <div className={styles.rightPanel2}>
              <h2 className={styles.headingSecondary2}>SIGN UP</h2>
              <h3 className={styles.headingTertiary}>PLS FILL THE FORM</h3>

              <form className={styles.form2} onSubmit={handleSignupSubmit}>
                <div className={styles.twoColumn}>
                  <div className={styles.question}>
                    <label htmlFor="first-name" className={styles.label2}>
                      First Name
                    </label>
                    <input
                      id="first-name"
                      name="firstName"
                      type="text"
                      placeholder="Ex. John"
                      className={styles.inputSign}
                      value={signUpData.firstName}
                      onChange={handleSignUpInputChange}
                    />
                  </div>
                  <div className={styles.question}>
                    <label htmlFor="last-name" className={styles.label2}>
                      Last Name
                    </label>
                    <input
                      id="last-name"
                      name="lastName"
                      type="text"
                      placeholder="Ex. Pork"
                      className={styles.inputSign}
                      value={signUpData.lastName}
                      onChange={handleSignUpInputChange}
                    />
                  </div>
                </div>

                <div className={styles.twoColumn}>
                  <div className={styles.question}>
                    <label htmlFor="email-signup" className={styles.label2}>
                      Email
                    </label>
                    <input
                      id="email-signup"
                      name="email"
                      type="email"
                      placeholder="Ex. muppets@show.com"
                      className={styles.inputSign}
                      value={signUpData.email}
                      onChange={handleSignUpInputChange}
                    />
                  </div>
                  <div className={styles.question}>
                    <label htmlFor="username" className={styles.label2}>
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Ex. KerminThePhrog"
                      className={styles.inputSign}
                      value={signUpData.username}
                      onChange={handleSignUpInputChange}
                    />
                  </div>
                </div>

                <div className={styles.twoColumn}>
                  <div className={styles.question}>
                    <label htmlFor="password-signup" className={styles.label2}>
                      Password
                    </label>
                    <input
                      id="password-signup"
                      name="password"
                      type="password"
                      placeholder="8 characters with a number"
                      className={styles.inputSign}
                      value={signUpData.password}
                      onChange={handleSignUpInputChange}
                    />
                  </div>
                  <div className={styles.question}>
                    <label htmlFor="confirm-password" className={styles.label2}>
                      Confirm Password
                    </label>
                    <input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="********"
                      className={styles.inputSign}
                      value={signUpData.confirmPassword}
                      onChange={handleSignUpInputChange}
                    />
                  </div>
                </div>

                <div className={styles.buttons2}>
                  <button
                    type="submit"
                    className={styles.loginBtn}
                  >
                    Create Account
                  </button>

                  <h2 className={styles.Or}> OR </h2>

                  <button
                    type="button"
                    onClick={handleGitHubLogin}
                    className={styles.githubLogin}
                  >
                    Continue with GitHub
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
