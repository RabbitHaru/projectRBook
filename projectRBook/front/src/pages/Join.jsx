import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, User, Mail, Lock } from 'lucide-react';

const Join = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', name: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/auth/join', formData);
            alert('회원가입이 완료되었습니다! 로그인해주세요.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data || '회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <div style={{ maxWidth: '450px', margin: '4rem auto' }}>
            <div className="glass" style={{ padding: '3rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '1rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                        <UserPlus size={32} />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>함께해요! ✨</h2>
                    <p style={{ color: 'var(--text-muted)' }}>BookBlog의 새로운 멤버가 되어보세요.</p>
                </div>

                {error && <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <InputGroup label="아이디" icon={<User size={18} />} placeholder="아이디" value={formData.username} onChange={(v) => setFormData({ ...formData, username: v })} />
                    <InputGroup label="이름" icon={<User size={18} />} placeholder="실명 또는 닉네임" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
                    <InputGroup label="이메일" icon={<Mail size={18} />} type="email" placeholder="example@email.com" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />
                    <InputGroup label="비밀번호" icon={<Lock size={18} />} type="password" placeholder="비밀번호 설정" value={formData.password} onChange={(v) => setFormData({ ...formData, password: v })} />

                    <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '1rem', marginTop: '1rem' }}>
                        가입하기
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    이미 계정이 있으신가요? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>로그인</Link>
                </div>
            </div>
        </div>
    );
};

const InputGroup = ({ label, icon, ...props }) => (
    <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>{label}</label>
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex' }}>{icon}</div>
            <input
                {...props}
                onChange={(e) => props.onChange(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'white' }}
                required
            />
        </div>
    </div>
);

export default Join;
