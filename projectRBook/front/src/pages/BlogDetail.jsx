import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Edit, Trash2, Calendar, User, Book, Star, Quote, Heart, Send, MessageCircle, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [blogRes, commentRes] = await Promise.all([
                    axios.get(`http://localhost:8080/api/blogs/${id}`),
                    axios.get(`http://localhost:8080/api/comments/blog/${id}`)
                ]);
                setBlog(blogRes.data);
                setComments(commentRes.data);
            } catch (err) {
                console.error("Fetch data error:", err);
                toast.error("리뷰를 불러오는 데 실패했습니다.");
                navigate('/blogs');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    const handleLike = async () => {
        if (!user) return toast.error("로그인이 필요합니다.");
        try {
            const res = await axios.post(`http://localhost:8080/api/blogs/${id}/like`);
            setBlog(res.data);
            toast.success("추천되었습니다.");
        } catch (err) {
            toast.error("추천 중 오류가 발생했습니다.");
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error("로그인이 필요합니다.");
        if (!newComment.trim()) return;

        try {
            const res = await axios.post('http://localhost:8080/api/comments', {
                blogId: id,
                content: newComment,
                writer: user.name || user.username,
                username: user.username
            });
            setComments([res.data, ...comments]);
            setNewComment('');
            toast.success("댓글이 등록되었습니다.");
        } catch (err) {
            toast.error("댓글 등록 중 오류가 발생했습니다.");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("정말로 이 리뷰를 삭제하시겠습니까?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/blogs/${id}`);
            toast.success("리뷰가 삭제되었습니다.");
            navigate('/blogs');
        } catch (err) {
            toast.error("삭제 중 오류가 발생했습니다.");
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '10rem 0' }}>리뷰를 불러오는 중...</div>;
    if (!blog) return null;

    const isOwner = user && (user.username === blog.username);

    return (
        <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem', paddingBottom: '5rem' }}>
            <button onClick={() => navigate('/blogs')} className="btn" style={{ marginBottom: '2rem', background: 'rgba(0,0,0,0.02)' }}>
                <ArrowLeft size={18} /> 목록으로 돌아가기
            </button>

            <article className="glass" style={{ padding: '0', overflow: 'hidden', borderRadius: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ padding: '3.5rem', background: 'linear-gradient(to bottom, rgba(99, 102, 241, 0.05), transparent)', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '0 0 220px', height: '310px', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--glass-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                        {blog.img ? <img src={blog.img} alt={blog.bookTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Book size={64} color="var(--primary)" opacity={0.3} /></div>}
                    </div>

                    <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                            <Book size={16} /> <span>Book Review</span>
                        </div>
                        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: 1.2, letterSpacing: '-1px' }}>{blog.title}</h1>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1.5rem', marginTop: 'auto' }}>
                            <InfoBox icon={<User size={16} />} label="저자" value={blog.bookAuthor} />
                            <InfoBox icon={<Calendar size={16} />} label="게시일" value={new Date(blog.createdAt).toLocaleDateString()} />
                            <div className="item">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}><Star size={16} color="#f59e0b" /> 평점</div>
                                <div style={{ display: 'flex', gap: '2px' }}>
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < blog.bookRating ? "#f59e0b" : "transparent"} color={i < blog.bookRating ? "#f59e0b" : "rgba(0,0,0,0.1)"} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ padding: '3.5rem', position: 'relative' }}>
                    <Quote size={60} style={{ position: 'absolute', top: '2.5rem', left: '1.5rem', opacity: 0.05, color: 'var(--primary)' }} />
                    <div style={{ fontSize: '1.15rem', lineHeight: '1.9', whiteSpace: 'pre-wrap', color: 'var(--text-main)', position: 'relative', zIndex: 1, marginBottom: '4rem' }}>{blog.content}</div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '3.5rem' }}>
                        <button onClick={handleLike} className="btn" style={{ background: blog.likesCount > 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(0,0,0,0.02)', color: blog.likesCount > 0 ? '#ef4444' : 'var(--text-main)', border: '1px solid currentColor', padding: '0.8rem 1.8rem', borderRadius: '2rem', transition: 'all 0.3s' }}>
                            <Heart size={20} fill={blog.likesCount > 0 ? "#ef4444" : "transparent"} /> 추천 {blog.likesCount}
                        </button>
                    </div>

                    <div style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '48px', height: '48px', background: 'var(--primary)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', fontSize: '1.2rem' }}>{blog.writer?.charAt(0)}</div>
                            <div>
                                <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>{blog.writer}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>@{blog.username}</div>
                            </div>
                        </div>

                        {isOwner && (
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <Link to={`/blogs/edit/${id}`} className="btn" style={{ background: 'rgba(99, 102, 241, 0.05)', color: 'var(--primary)' }}><Edit size={18} /> 수정</Link>
                                <button onClick={handleDelete} className="btn" style={{ background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444' }}><Trash2 size={18} /> 삭제</button>
                            </div>
                        )}
                    </div>
                </div>
            </article>

            <section className="glass" style={{ padding: '3rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', fontSize: '1.4rem', fontWeight: 'bold' }}>
                    <MessageCircle size={24} color="var(--primary)" /> 댓글 {comments.length}
                </h3>
                
                <form onSubmit={handleCommentSubmit} style={{ marginBottom: '3rem', position: 'relative' }}>
                    <textarea 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        placeholder={user ? "리뷰에 대한 생각을 자유롭게 나눠보세요..." : "로그인 후 댓글을 남길 수 있습니다."}
                        disabled={!user}
                        style={{ width: '100%', minHeight: '120px', padding: '1.25rem', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--glass-border)', borderRadius: '1rem', color: 'var(--text-main)', resize: 'none', fontSize: '1rem' }}
                    />
                    <button type="submit" disabled={!user || !newComment.trim()} className="btn btn-primary" style={{ position: 'absolute', right: '1rem', bottom: '1rem', padding: '0.6rem 1.25rem' }}>
                        <Send size={18} /> 댓글 등록
                    </button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {comments.map(comment => (
                        <div key={comment.id} style={{ display: 'flex', gap: '1.25rem' }}>
                            <div style={{ flexShrink: 0, width: '40px', height: '40px', background: 'rgba(0,0,0,0.04)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>{comment.writer?.charAt(0)}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                                    <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{comment.writer}</span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-main)' }}>{comment.content}</p>
                            </div>
                        </div>
                    ))}
                    {comments.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.01)', borderRadius: '1rem' }}>
                            <Info size={32} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                            <p>아직 댓글이 없습니다. 첫 소통의 주인공이 되어보세요!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

const InfoBox = ({ icon, label, value }) => (
    <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>{icon} {label}</div>
        <div style={{ fontWeight: '600', fontSize: '1rem' }}>{value || '-'}</div>
    </div>
);

export default BlogDetail;
