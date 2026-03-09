import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Plus, Book as BookIcon, User as UserIcon, Star } from 'lucide-react';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/blogs');
                setBlogs(res.data);
            } catch (err) {
                console.error("Fetch blogs error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="blog-list-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>📚 책 리뷰 탐방</h1>
                    <p style={{ color: 'var(--text-muted)' }}>다양한 독자들의 생생한 리뷰를 확인해보세요.</p>
                </div>
                {user && (
                    <Link to="/blogs/write" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                        <Plus size={20} />
                        새 리뷰 작성
                    </Link>
                )}
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '5rem' }}>로딩 중...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {blogs.map(blog => (
                        <div key={blog.id} className="glass card animate-fade-in" style={{ overflow: 'hidden', transition: 'var(--transition)', cursor: 'pointer' }}>
                            <div style={{ height: '200px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                                {blog.img ? <img src={blog.img} alt={blog.bookTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '📚'}
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                    <BookIcon size={14} />
                                    {blog.bookTitle}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', height: '3.6rem', overflow: 'hidden' }}>{blog.title}</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <UserIcon size={14} />
                                        {blog.writer}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', color: '#f59e0b' }}>
                                        <Star size={14} fill="#f59e0b" />
                                        <span style={{ marginLeft: '4px' }}>{blog.bookRating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {blogs.length === 0 && (
                        <div className="glass" style={{ gridColumn: '1/-1', padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            등록된 리뷰가 없습니다. 첫 번째 리뷰를 작성해보세요!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BlogList;
