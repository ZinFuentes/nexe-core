import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from './AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError(null);
      
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then((res) => res.json());

        if (window.google && window.google.script) {
          window.google.script.run
            .withSuccessHandler((response) => {
              if (response.authorized) {
                login({
                  ...response,
                  email: userInfo.email,
                  picture: userInfo.picture
                });
              } else {
                setError(response.message || 'Accés no autoritzat.');
                setLoading(false);
              }
            })
            .withFailureHandler((err) => {
              setError(`Error de connexió: ${err.message || err}`);
              setLoading(false);
            })
            .validateUserAccess(userInfo.email);
        } else {
          console.warn('⚠️ Entorno Local: Simulando login');
          login({
            name: userInfo.given_name,
            surname: userInfo.family_name,
            email: userInfo.email,
            role: 'Desarrollador (Local)',
            picture: userInfo.picture,
            isAdmin: true,
            config: {}
          });
        }

      } catch (err) {
        console.error(err);
        setError('Error al processar la informació de Google.');
        setLoading(false);
      }
    },
    onError: () => {
      setError('Ha fallat la connexió amb Google.');
      setLoading(false);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 shadow-xl rounded-xl border border-gray-100">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            NEXE <span className="text-blue-600">Core v20</span>
          </h2>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={() => googleLogin()}
            disabled={loading}
            className={`flex w-full justify-center rounded-md px-4 py-3 text-sm font-medium text-white transition-colors
              ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}`}
          >
            {loading ? 'Validant...' : 'Entrar amb Google'}
          </button>
        </div>
      </div>
    </div>
  );
}