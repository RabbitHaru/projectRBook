import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Book, Calendar, LogOut, Heart, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [myBlogs, setMyBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            toast.error("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        const fetchMyBlogs = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/blogs/user/${user.username}`);
                setMyBlogs(res.data);
            } catch (err) {
                console.error("Fetch my blogs error:", err);
                toast.error("리뷰 목록을 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };
        fetchMyBlogs();
    }, [user, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        toast.success("로그아웃 되었습니다.");
        navigate('/');
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '10rem 0' }}>데이터를 불러오는 중...</div>;

    return (
        <div style={{ maxWidth: '1100px', margin: '3rem auto', padding: '0 1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '3rem' }}>
                {/* 프로필 정보 카드 */}
                <aside>
                    <div className="glass" style={{ padding: '2.5rem', textAlign: 'center', position: 'sticky', top: '2rem', borderRadius: '1.5rem' }}>
                        <div style={{ width: '110px', height: '110px', background: 'var(--primary)', borderRadius: '2.5rem', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)' }}>
                            {user.name ? user.name.charAt(0) : user.username.charAt(0)}
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>{user.name}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>@{user.username}</p>
                        
                        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem', background: 'rgba(0,0,0,0.02)', borderRadius: '1rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                                <Mail size={16} color="var(--primary)" />
                                <span>{user.email}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                                <Book size={16} color="var(--primary)" />
                                <span>작성한 리뷰: <span style={{ fontWeight: 'bold' }}>{myBlogs.length}개</span></span>
                            </div>
                        </div>

                        <button onClick={handleLogout} className="btn" style={{ width: '100%', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', height: '3.5rem', borderRadius: '1rem' }}>
                            <LogOut size={18} /> 로그아웃
                        </button>
                    </div>
                </aside>

                {/* 작성한 리뷰 목록 */}
                <section>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Book color="var(--primary)" size={28} /> 나의 독서 기록
                    </h3>
                    
                    {myBlogs.length === 0 ? (
                        <div className="glass" style={{ padding: '6rem 2rem', textAlign: 'center', color: 'var(--text-muted)', borderRadius: '1.5rem' }}>
                            <Search size={48} style={{ marginBottom: '1.5rem', opacity: 0.1 }} />
                            <p style={{ fontSize: '1.1rem' }}>아직 작성한 리뷰가 없습니다.<br />첫 번째 리뷰를 남겨보세요!</p>
                            <button onClick={() => navigate('/blogs/write')} className="btn btn-primary" style={{ marginTop: '2rem' }}>리뷰 작성하기</button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {myBlogs.map(blog => (
                                <div key={blog.id} className="glass card-hover" style={{ padding: '1.5rem', display: 'flex', gap: '2rem', cursor: 'pointer', borderRadius: '1.25rem' }} onClick={() => navigate(`/blogs/${blog.id}`)}>
                                    <div style={{ width: '100px', height: '140px', background: 'rgba(0,0,0,0.03)', borderRadius: '0.75rem', overflow: 'hidden', flexShrink: 0 }}>
                                        {blog.img ? (
                                            <img src={blog.img} alt={blog.bookTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', opacity: 0.2 }}><Book size={32} /></div>
                                        )}
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase' }}>{blog.bookTitle}</div>
                                        <h4 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>{blog.title}</h4>
                                        <div style={{ marginTop: 'auto', display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={16} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Heart size={16} fill={blog.likesCount > 0 ? "#ef4444" : "transparent"} color={blog.likesCount > 0 ? "#ef4444" : "currentColor"} /> {blog.likesCount}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Profile;
