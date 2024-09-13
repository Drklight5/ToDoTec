"use client";

import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../../helpers/firebase';
import Image from 'next/image';
import { useAppContext } from '@/helpers/context';
import { useRouter } from "next/navigation";

const LoginPage = () => {

  const router = useRouter();
  const [error, setError] = useState('');
  const {data, setData} = useAppContext();

  const handleLogin = async (provider) => {
    try {
      let user = await signInWithPopup(auth, provider);
      setData(prev => {
        prev.user = {
          uid: user.user.uid,
          name: user.user.displayName,
          email: user.user.email,
        }
        return prev
      }
        );

      // Redirige al usuario a la página principal o dashboard
      router.push("/"); // Ensure the route is correct
    } catch (err) {
      setError('Error al iniciar sesión: ' + err.message);
    }
  };

  return (
    <div className="login-page">
      <Image
        className="mb-4"
        src="/logo.png"
        alt="ToDoTec logo"
        width={180}
        height={180}
        priority
      />
      <h2>Iniciar Sesión</h2>
      <div className="buttons-container">
        <button
          onClick={() => handleLogin(googleProvider)}
          className="login-button google-button"
        >
          <Image
            src="/icons/googleicon.png"
            alt="Google"
            className="icon"
            width={24}
            height={24}
          />
          <span>Iniciar sesión con Google</span>
        </button>
        <button
          onClick={() => handleLogin(githubProvider)}
          className="login-button github-button"
        >
          <Image
            src="/icons/githubicon.svg"
            alt="GitHub"
            className="icon"
            width={24}
            height={24}
          />
          <span>Iniciar sesión con GitHub</span>
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <style jsx>{`
        .login-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f5f5f5;
          padding: 0 20px;
        }
        h2 {
          margin-bottom: 20px;
        }
        .buttons-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .login-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
          width: 250px;
          text-align: center;
          transition: background-color 0.3s;
          gap: 10px;
        }
        .google-button {
          background-color: #00bcd4; /* Color aqua */
        }
        .google-button:hover {
          background-color: #0097a7;
        }
        .github-button {
          background-color: #6e6e6e; /* Color gris */
        }
        .github-button:hover {
          background-color: #484848;
        }
        .icon {
          width: 24px;
          height: 24px;
        }
        .error-message {
          color: red;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
