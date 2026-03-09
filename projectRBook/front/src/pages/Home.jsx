import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, Users, Star } from 'lucide-react';
import axios from 'axios';

const Home = () => {
    const [stats, setStats] = useState({ blogs: 0, users: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const blogRes = await axios.get('http://localhost:8080/api/blogs');
                setStats(prev => ({ ...prev, blogs: blogRes.data.length }));
            } catch (err) {
                console.error("Stats fetch error:", err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="home-page">
            <section className="hero-section glass" style={{
                padding: '5rem 3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '4rem',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <div style={{ flex: 1, zIndex: 1 }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                        독서의 즐거움을 <span style={{ color: 'var(--primary)' }}>나누세요!</span> 📚
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '500px' }}>
                        다양한 책들의 리뷰와 감상을 공유하는 책 리뷰 커뮤니티에서 당신의 다음 인생 책을 찾아보세요.
                    </p>
                    <Link to="/blogs" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                        리뷰 탐방하기 <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="hero-graphic" style={{ flex: '0 0 300px', fontSize: '5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <span style={{ animation: 'fadeIn 1s ease 0.2s' }}>📖</span>
                    <span style={{ animation: 'fadeIn 1s ease 0.4s', alignSelf: 'flex-end' }}>✍️</span>
                    <span style={{ animation: 'fadeIn 1s ease 0.6s' }}>⭐</span>
                </div>
            </section>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                <StatItem icon={<Book color="#6366f1" />} number={stats.blogs} label="총 리뷰 수" />
                <StatItem icon={<Users color="#ec4899" />} number={stats.users} label="활동 회원" />
                <StatItem icon={<Star color="#f59e0b" />} number="4.8" label="평균 평점" />
            </div>
        </div>
    );
};

const StatItem = ({ icon, number, label }) => (
    <div className="glass" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', marginBottom: '0.5rem' }}>{icon}</div>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{number}</div>
        <div style={{ color: 'var(--text-muted)', fontWeight: '500' }}>{label}</div>
    </div>
);

export default Home;
