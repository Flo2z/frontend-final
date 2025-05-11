import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useGlobalContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        try {
            await register({ name, email, password });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
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
                    }}>Create Account</h2>
                    <p style={{
                        marginTop: '8px',
                        fontSize: '14px',
                        color: '#666',
                        fontFamily: "'Nunito', sans-serif"
                    }}>Start tracking your expenses today</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label htmlFor="name" style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#333',
                            marginBottom: '8px'
                        }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <UserIcon style={{
                                width: '20px',
                                height: '20px',
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#aaa'
                            }} />
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                placeholder="John Doe"
                                onFocus={(e) => e.target.style.borderColor = '#FFA500'}
                                onBlur={(e) => e.target.style.borderColor = '#ccc'}
                            />
                        </div>
                    </div>

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

                    <div>
                        <label htmlFor="confirm-password" style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#333',
                            marginBottom: '8px'
                        }}>Confirm Password</label>
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
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            style={{
                                width: '16px',
                                height: '16px',
                                marginRight: '8px',
                                accentColor: '#FFA500'
                            }}
                        />
                        <label htmlFor="terms" style={{
                            fontSize: '14px',
                            color: '#666'
                        }}>
                            I agree to the{' '}
                            <a href="#" style={{
                                color: '#FFA500',
                                textDecoration: 'none'
                            }}
                               onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                               onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                            >Terms of Service</a>
                        </label>
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
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <p style={{
                        fontSize: '14px',
                        color: '#666'
                    }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{
                            color: '#FFA500',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                              onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                        >Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;