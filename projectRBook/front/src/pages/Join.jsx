import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, User, Mail, Lock, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Join = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', name: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/auth/join', formData);
            toast.success('회원가입이 완료되었습니다!');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data || '회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <div style={{ maxWidth: '480px', margin: '5rem auto' }}>
            <div className="glass" style={{ padding: '3.5rem', borderRadius: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'inline-flex', padding: '1.25rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '1.25rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                        <UserPlus size={40} />
                    </div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '0.75rem', letterSpacing: '-1px' }}>Create Account</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>RBook의 새로운 독자가 되어보세요.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <InputGroup label="아이디" icon={<User size={18} />} placeholder="Username" value={formData.username} onChange={(v) => setFormData({ ...formData, username: v })} />
                    <InputGroup label="이름" icon={<CheckCircle2 size={18} />} placeholder="Full Name" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
                    <InputGroup label="이메일" icon={<Mail size={18} />} type="email" placeholder="Email Address" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />
                    <InputGroup label="비밀번호" icon={<Lock size={18} />} type="password" placeholder="Password" value={formData.password} onChange={(v) => setFormData({ ...formData, password: v })} />

                    <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '1.1rem', fontSize: '1.1rem', fontWeight: '700', marginTop: '1.5rem', borderRadius: '1rem' }}>
                        가입하기
                    </button>
                </form>

                <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                    이미 계정이 있으신가요? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>로그인</Link>
                </div>
            </div>
        </div>
    );
};

const InputGroup = ({ label, icon, ...props }) => (
    <div className="form-group">
        <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>{label}</label>
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex' }}>{icon}</div>
            <input
                {...props}
                onChange={(e) => props.onChange(e.target.value)}
                style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--glass-border)', borderRadius: '0.8rem', color: 'var(--text-main)', fontSize: '1rem' }}
                required
            />
        </div>
    </div>
);

export default Join;
