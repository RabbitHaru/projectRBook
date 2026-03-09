import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, User, LogIn, UserPlus } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  // TODO: 실제 상태 관리(Context/Redux) 연동 예정
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
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
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
        <BookOpen size={28} />
        <span>BookBlog</span>
      </Link>

      <nav style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/" className="nav-link">홈</Link>
        <Link to="/blogs" className="nav-link">리뷰 탐방</Link>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user ? (
          <>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <User size={16} inline style={{ marginRight: '4px' }} />
              {user.username}님
            </span>
            <button onClick={handleLogout} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              <LogOut size={18} />
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
