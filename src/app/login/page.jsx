'use client' // Asegura que este componente sea un componente del cliente

import { login, signup, loginWithOAuth } from './actions'
import styles from '@/styles/logIn.module.css'
import { useState } from 'react'
import Image from 'next/image'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await login(formData); // Llama a la función de login con los datos del formulario
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await signup(formData); // Llama a la función de signup con los datos del formulario
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  

  const handleGitHubLogin = async () => {
    try {
      await loginWithOAuth('github')
    } catch (error) {
      console.error("Error during GitHub login:", error)
    }
  }

  const handleToggle = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <div className={styles.container}>
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

                <button type="button" onClick={handleGitHubLogin} className={styles.githubLogin}>Log in with GitHub</button>

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
              <h3 className={styles.headingTertiary}>WELCOME TO JOBHILL</h3>


              <form className={styles.form2} onSubmit={handleSignupSubmit} >
                <div className={styles.twoColumn}>
                  <div className={styles.question}>
                    <label htmlFor="first-name" className={styles.label2}>First Name</label>
                    <input id="first-name" type="text" placeholder="Ex. John" className={styles.inputSign} />
                  </div>
                  <div className={styles.question}>
                    <label htmlFor="last-name" className={styles.label2}>Last Name</label>
                    <input id="last-name" type="text" placeholder="Ex. Pork" className={styles.inputSign} />
                  </div>
                </div>

                <div className={styles.twoColumn}>

                <div className={styles.question}>
                <label htmlFor="email-signup" className={styles.label2}>Email</label>
                <input  name="email-signup" type="email" placeholder="Ex. muppets@show.com" className={styles.inputSign} />
                </div>
                <div className={styles.question}>
                <label htmlFor="username" className={styles.label2}>Username</label>
                <input id="username" type="text" placeholder="Ex. Isaac Rojas" className={styles.inputSign} />
                </div>
                </div>

                <div className={styles.twoColumn}>
                  <div className={styles.question}>
                    <label htmlFor="password-signup" className={styles.label2}>Password</label>
                    <input name="password-signup" type="password" placeholder="8 characters with a number" className={styles.inputSign} />
                  </div>
                  <div className={styles.question}>
                    <label htmlFor="confirm-password" className={styles.label2}>Confirm Password</label>
                    <input id="confirm-password" type="password" placeholder="********" className={styles.inputSign} />
                  </div>
                </div>

                <div className={styles.buttons2}>
                <button type="submit" className={styles.loginBtn}>Create Account</button>


                <h2 className={styles.Or}> OR </h2>

                <button type="button" onClick={handleGitHubLogin} className={styles.githubLogin}>Continue with GitHub</button>
                </div>
               
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
