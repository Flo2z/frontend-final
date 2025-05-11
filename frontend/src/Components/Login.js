import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useGlobalContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom right, #e6e6fa, #f0f0f0)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                padding: '32px',
                margin: '0 auto'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h2 style={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: '#222260',
                        fontFamily: "'Nunito', sans-serif"
                    }}>Welcome Back</h2>
                    <p style={{
                        marginTop: '8px',
                        fontSize: '14px',
                        color: '#666',
                        fontFamily: "'Nunito', sans-serif"
                    }}>Sign in to track your expenses</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label htmlFor="email" style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#333',
                            marginBottom: '8px'
                        }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <EnvelopeIcon style={{
                                width: '20px',
                                height: '20px',
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#aaa'
                            }} />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px 10px 40px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    fontFamily: "'Nunito', sans-serif"
                                }}
                                placeholder="you@example.com"
                                onFocus={(e) => e.target.style.borderColor = '#FFA500'}
                                onBlur={(e) => e.target.style.borderColor = '#ccc'}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#333',
                            marginBottom: '8px'
                        }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <LockClosedIcon style={{
                                width: '20px',
                                height: '20px',
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#aaa'
                            }} />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px 10px 40px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    fontFamily: "'Nunito', sans-serif"
                                }}
                                placeholder="••••••••"
                                onFocus={(e) => e.target.style.borderColor = '#FFA500'}
                                onBlur={(e) => e.target.style.borderColor = '#ccc'}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="error" style={{
                            textAlign: 'center',
                            fontSize: '14px',
                            padding: '8px',
                            background: '#ffe6e6',
                            borderRadius: '8px'
                        }}>
                            {error}
                        </div>
                    )}

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    marginRight: '8px',
                                    accentColor: '#FFA500'
                                }}
                            />
                            <label htmlFor="remember-me" style={{
                                fontSize: '14px',
                                color: '#666'
                            }}>Remember me</label>
                        </div>

                        <a href="#" style={{
                            fontSize: '14px',
                            color: '#FFA500',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                           onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                           onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                        >Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: loading ? '#ccc' : '#FFA500',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '500',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background 0.2s',
                            fontFamily: "'Nunito', sans-serif"
                        }}
                        onMouseOver={(e) => !loading && (e.target.style.background = '#FF8C00')}
                        onMouseOut={(e) => !loading && (e.target.style.background = '#FFA500')}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <p style={{
                        fontSize: '14px',
                        color: '#666'
                    }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{
                            color: '#FFA500',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                              onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                        >Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;