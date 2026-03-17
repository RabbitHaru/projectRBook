import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Plus, Book as BookIcon, User as UserIcon, Star, Search, Filter, Calendar, Heart, Library } from 'lucide-react';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('latest'); // latest, likes, rating
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

    const processBlogs = () => {
        let result = blogs.filter(blog => 
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.writer.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortBy === 'latest') {
            result.sort((a, b) => b.id - a.id);
        } else if (sortBy === 'likes') {
            result.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.bookRating - a.bookRating);
        }

        return result;
    };

    const filteredBlogs = processBlogs();

    return (
        <div className="blog-list-page" style={{ paddingBottom: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <Library size={36} color="var(--primary)" />
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>책 리뷰 탐방</h1>
                    </div>
                    <p style={{ color: 'var(--text-muted)' }}>다양한 독자들의 생생한 리뷰를 확인해보세요.</p>
                </div>
                
                {user && (
                    <Link to="/blogs/write" className="btn btn-primary" style={{ padding: '0.9rem 1.5rem', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)' }}>
                        <Plus size={20} /> 새 리뷰 작성
                    </Link>
                )}
            </div>

            <div className="glass" style={{ padding: '1.25rem', marginBottom: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
                    <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                    <input 
                        type="text" 
                        placeholder="제목, 책 이름, 작성자 검색..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--glass-border)', borderRadius: '0.6rem', color: 'var(--text-main)' }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Filter size={18} color="var(--text-muted)" />
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{ padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--glass-border)', borderRadius: '0.6rem', color: 'var(--text-main)', outline: 'none', cursor: 'pointer' }}
                    >
                        <option value="latest">최신순</option>
                        <option value="likes">추천순</option>
                        <option value="rating">평점순</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '10rem 0' }}>
                    <div className="spinner" style={{ border: '4px solid rgba(0,0,0,0.1)', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
                    <p style={{ color: 'var(--text-muted)' }}>리뷰 데이터를 불러오고 있습니다...</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {filteredBlogs.map(blog => (
                        <Link 
                            key={blog.id} 
                            to={`/blogs/${blog.id}`} 
                            className="glass card-hover" 
                            style={{ overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ height: '220px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(99, 102, 241, 0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                                {blog.img ? (
                                    <img src={blog.img} alt={blog.bookTitle} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="zoom-hover" />
                                ) : (
                                    <div style={{ textAlign: 'center', color: 'var(--primary)', opacity: 0.5 }}>
                                        <BookIcon size={64} />
                                    </div>
                                )}
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                    <Heart size={14} fill={blog.likesCount > 0 ? "#ef4444" : "transparent"} color={blog.likesCount > 0 ? "#ef4444" : "white"} /> {blog.likesCount || 0}
                                </div>
                            </div>

                            <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    <span>#{blog.bookTitle}</span>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', lineHeight: '1.4', height: '3.5rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{blog.title}</h3>
                                
                                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '28px', height: '28px', background: 'var(--primary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>{blog.writer?.charAt(0)}</div>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '500' }}>{blog.writer}</span>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                size={14} 
                                                fill={i < blog.bookRating ? "#f59e0b" : "transparent"} 
                                                color={i < blog.bookRating ? "#f59e0b" : "rgba(0,0,0,0.1)"} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    
                    {filteredBlogs.length === 0 && (
                        <div className="glass" style={{ gridColumn: '1/-1', padding: '6rem 2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity:0.1 }}>🔎</div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>검색 결과가 없습니다.</h3>
                            <p style={{ color: 'var(--text-muted)' }}>다른 검색어를 입력하거나 필터를 초기화해보세요.</p>
                            <button onClick={() => {setSearchTerm(''); setSortBy('latest');}} className="btn btn-primary" style={{ marginTop: '2rem' }}>필터 초기화</button>
                        </div>
                    )}
                </div>
            )}

            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                .card-hover:hover .zoom-hover { transform: scale(1.1); }
            `}</style>
        </div>
    );
};

export default BlogList;
