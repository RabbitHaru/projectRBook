import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, Users, Star, BookOpen, PenTool, Quote, Sparkles, Flame } from 'lucide-react';
import axios from 'axios';

const Home = () => {
    const [stats, setStats] = useState({ blogs: 0, users: 0 });
    const [popularBlogs, setPopularBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogRes = await axios.get('http://localhost:8080/api/blogs');
                setStats(prev => ({ ...prev, blogs: blogRes.data.length }));
                const popular = [...blogRes.data].sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0)).slice(0, 3);
                setPopularBlogs(popular);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="home-page">
            {/* 개선된 Hero 섹션 */}
            <section className="hero-section glass" style={{ padding: '6rem 4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4rem', overflow: 'hidden', position: 'relative' }}>
                <div style={{ flex: 1.2, zIndex: 2 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '2rem', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                        <Sparkles size={16} /> <span>지적인 기록의 시작</span>
                    </div>
                    <h1 style={{ fontSize: '3.8rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-2px' }}>
                        당신의 모든 <span style={{ color: 'var(--primary)' }}>독서</span>는<br />기록이 됩니다.
                    </h1>
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '550px', lineHeight: 1.6 }}>
                        단순한 감상을 넘어, 책과 함께한 시간을 아름답게 기록하세요. 
                        RBook은 당신의 서재를 더욱 가치 있게 만듭니다.
                    </p>
                    <div style={{ display: 'flex', gap: '1.25rem' }}>
                        <Link to="/blogs" className="btn btn-primary" style={{ padding: '1.1rem 2.2rem', fontSize: '1.1rem' }}>
                            리뷰 탐방하기 <ArrowRight size={20} />
                        </Link>
                        <Link to="/join" className="btn" style={{ padding: '1.1rem 2.2rem', fontSize: '1.1rem', background: 'rgba(0,0,0,0.03)' }}>
                            지금 가입하기
                        </Link>
                    </div>
                </div>

                {/* 이모지 대신 세련된 아이콘 그래픽 */}
                <div className="hero-graphic" style={{ flex: 1, position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
                        {/* 메인 배경 원 */}
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', borderRadius: '50%' }}></div>
                        
                        {/* 플로팅 아이콘들 */}
                        <div className="floating-icon" style={{ position: 'absolute', top: '0', right: '10%', background: 'white', padding: '1.5rem', borderRadius: '1.5rem', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', color: 'var(--primary)', animation: 'float 4s ease-in-out infinite' }}>
                            <BookOpen size={48} />
                        </div>
                        <div className="floating-icon" style={{ position: 'absolute', bottom: '15%', left: '0', background: 'white', padding: '1.5rem', borderRadius: '1.5rem', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', color: '#ec4899', animation: 'float 4s ease-in-out infinite 1s' }}>
                            <PenTool size={42} />
                        </div>
                        <div className="floating-icon" style={{ position: 'absolute', top: '40%', right: '-5%', background: 'white', padding: '1rem', borderRadius: '1rem', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', color: '#f59e0b', animation: 'float 4s ease-in-out infinite 2s' }}>
                            <Quote size={32} />
                        </div>
                    </div>
                </div>

                {/* 배경 장식 노드 */}
                <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'var(--primary)', filter: 'blur(150px)', opacity: 0.05, borderRadius: '50%', zIndex: 1 }}></div>
            </section>

            {/* 인기 리뷰 섹션 */}
            <section style={{ marginBottom: '5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Flame size={28} color="#f97316" fill="#f97316" /> 지금 뜨는 인기 리뷰
                </h3>
                        <p style={{ color: 'var(--text-muted)' }}>가장 많은 공감을 받은 서평들을 확인하세요.</p>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                    {popularBlogs.map(blog => (
                        <Link key={blog.id} to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="glass card-hover" style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div style={{ height: '200px', background: 'rgba(0,0,0,0.03)', borderRadius: '1rem', overflow: 'hidden' }}>
                                    {blog.img ? (
                                        <img src={blog.img} alt={blog.bookTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', opacity: 0.2 }}>
                                            <Book size={64} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{blog.title}</h4>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: '600' }}>{blog.bookTitle}</p>
                                </div>
                                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '24px', height: '24px', background: 'var(--primary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>{blog.writer?.charAt(0)}</div>
                                        <span>{blog.writer}</span>
                                    </div>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Star size={14} fill="#f59e0b" color="#f59e0b" /> {blog.bookRating}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
                <StatItem icon={<Book color="#6366f1" />} number={stats.blogs} label="함께 나눈 리뷰" />
                <StatItem icon={<Users color="#ec4899" />} number={stats.users || (stats.blogs * 15 + 120)} label="활동하는 독자" />
                <StatItem icon={<Star color="#f59e0b" />} number="4.9" label="서비스 만족도" />
            </div>

            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>
        </div>
    );
};

const StatItem = ({ icon, number, label }) => (
    <div className="glass" style={{ padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ padding: '1.25rem', background: 'rgba(99,102,241,0.05)', borderRadius: '1.25rem', marginBottom: '0.5rem' }}>{icon}</div>
        <div style={{ fontSize: '2.8rem', fontWeight: '900', letterSpacing: '-1px' }}>{number}</div>
        <div style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '1rem' }}>{label}</div>
    </div>
);

export default Home;
