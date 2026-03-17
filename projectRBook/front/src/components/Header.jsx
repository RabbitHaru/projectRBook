import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Library, LogOut, User, LogIn, UserPlus } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  // TODO: 실제 상태 관리(Context/Redux) 연동 예정
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    import('react-hot-toast').then(({ toast }) => toast.success("로그아웃 되었습니다."));
    navigate('/login');
  };

  return (
    <header className="header-navbar glass" style={{
      position: 'sticky',
      top: '1rem',
      zIndex: 1000,
      margin: '1rem 1.5rem',
      padding: '0.75rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)', textDecoration: 'none', letterSpacing: '-0.5px' }}>
        <div style={{ background: 'var(--primary)', padding: '0.4rem', borderRadius: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.2rem' }}>
          <Library size={22} color="white" />
        </div>
        <span><span style={{ color: 'var(--primary)' }}>R</span>Book</span>
      </Link>

      <nav style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/" className="nav-link">홈</Link>
        <Link to="/blogs" className="nav-link">리뷰 탐방</Link>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user ? (
          <>
            <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: 'var(--text-main)', textDecoration: 'none', fontWeight: '500' }}>
              <User size={18} color="var(--primary)" />
              {user.name || user.username}님
            </Link>
            <button onClick={handleLogout} className="btn" style={{ background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', padding: '0.5rem 1rem' }}>
              <LogOut size={16} />
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn" style={{ color: 'var(--text-main)' }}>
              <LogIn size={18} />
              로그인
            </Link>
            <Link to="/join" className="btn btn-primary">
              <UserPlus size={18} />
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
