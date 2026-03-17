import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { LogIn, Lock, User as UserIcon, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/auth/login', formData);
            localStorage.setItem('user', JSON.stringify(res.data));
            toast.success(`${res.data.name || res.data.username}님, 환영합니다!`);
            navigate('/');
        } catch (err) {
            toast.error('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <div style={{ maxWidth: '450px', margin: '6rem auto' }}>
            <div className="glass" style={{ padding: '3.5rem', borderRadius: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'inline-flex', padding: '1.25rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '1.25rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                        <ShieldCheck size={40} />
                    </div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '0.75rem', letterSpacing: '-1px' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>RBook 서비스에 로그인하세요.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>아이디</label>
                        <div style={{ position: 'relative' }}>
                            <UserIcon style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                            <input
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--glass-border)', borderRadius: '0.8rem', color: 'var(--text-main)', fontSize: '1rem' }}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>비밀번호</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--glass-border)', borderRadius: '0.8rem', color: 'var(--text-main)', fontSize: '1rem' }}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '1.1rem', fontSize: '1.1rem', fontWeight: '700', marginTop: '1rem', borderRadius: '1rem' }}>
                        로그인
                    </button>
                </form>

                <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                    아직 회원이 아니신가요? <Link to="/join" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>지금 가입하기</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
