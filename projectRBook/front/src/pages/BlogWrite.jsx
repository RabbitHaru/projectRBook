import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Book, Save, X, Star, Image as ImageIcon, Type, AlignLeft, User } from 'lucide-react';

const BlogWrite = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        bookTitle: '',
        bookAuthor: '',
        bookPublisher: '',
        bookRating: '5',
        img: '',
        writer: user ? user.username : '익명'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/blogs', formData);
            alert('리뷰가 성공적으로 등록되었습니다!');
            navigate('/blogs');
        } catch (err) {
            console.error("Blog post error:", err);
            alert('리뷰 등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <div className="glass" style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ padding: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.75rem', color: 'var(--primary)' }}>
                        <Book size={28} />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>새로운 책 리뷰 작성</h2>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* 도서 정보 섹션 */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                        <div style={{ gridColumn: '1 / -1', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                            📖 도서 정보
                        </div>
                        <FormInput label="책 제목" name="bookTitle" icon={<Book size={18} />} value={formData.bookTitle} onChange={handleChange} placeholder="리뷰할 책 제목" required />
                        <FormInput label="저자" name="bookAuthor" icon={<User size={18} />} value={formData.bookAuthor} onChange={handleChange} placeholder="작가 이름" required />
                        <FormInput label="출판사" name="bookPublisher" icon={<Type size={18} />} value={formData.bookPublisher} onChange={handleChange} placeholder="출판사" />

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>평점</label>
                            <div style={{ position: 'relative' }}>
                                <Star style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#f59e0b' }} size={18} />
                                <select
                                    name="bookRating"
                                    value={formData.bookRating}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'white', appearance: 'none' }}
                                >
                                    {[5, 4, 3, 2, 1].map(num => <option key={num} value={num} style={{ background: '#1a1a2e' }}>{num}점</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 리뷰 내용 섹션 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <FormInput label="리뷰 제목" name="title" icon={<Type size={18} />} value={formData.title} onChange={handleChange} placeholder="리뷰를 한 줄로 요약해주세요" required />

                        <FormInput label="이미지 URL (선택)" name="img" icon={<ImageIcon size={18} />} value={formData.img} onChange={handleChange} placeholder="https://..." />

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>리뷰 내용</label>
                            <div style={{ position: 'relative' }}>
                                <AlignLeft style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-muted)' }} size={18} />
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    placeholder="책을 읽고 느낀 점을 자유롭게 기록해보세요."
                                    style={{ width: '100%', minHeight: '200px', padding: '1rem 1rem 1rem 3rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'white', lineHeight: '1.6', resize: 'vertical' }}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={() => navigate('/blogs')} className="btn" style={{ flex: 1, justifyContent: 'center', background: 'rgba(255,255,255,0.05)' }}>
                            <X size={20} /> 취소
                        </button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                            <Save size={20} /> 리뷰 등록하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const FormInput = ({ label, icon, ...props }) => (
    <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>{label}</label>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)', display: 'flex' }}>{icon}</div>
            <input
                {...props}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'white' }}
            />
        </div>
    </div>
);

export default BlogWrite;
