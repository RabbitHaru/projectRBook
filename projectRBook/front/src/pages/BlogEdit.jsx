import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Book, Save, X, Star, Image as ImageIcon, Type, AlignLeft, User, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const BlogEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(true);
    
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        bookTitle: '',
        bookAuthor: '',
        bookPublisher: '',
        bookRating: 5,
        img: '',
        writer: '',
        username: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/blogs/${id}`);
                const data = res.data;
                
                if (!user || user.username !== data.username) {
                    toast.error("수정 권한이 없습니다.");
                    navigate(`/blogs/${id}`);
                    return;
                }

                setFormData(data);
                if (data.img) setPreviewUrl(data.img);
            } catch (err) {
                console.error("Fetch error:", err);
                toast.error("리뷰를 불러오지 못했습니다.");
                navigate('/blogs');
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id, navigate, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        const loadingToast = toast.loading("리뷰를 수정하는 중...");

        try {
            let imageUrl = formData.img;
            
            // 새로운 이미지가 선택되었다면 업로드
            if (imageFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', imageFile);
                const uploadRes = await axios.post('http://localhost:8080/api/upload', uploadFormData);
                imageUrl = "http://localhost:8080" + uploadRes.data;
            }

            const dataToSubmit = {
                ...formData,
                bookRating: parseInt(formData.bookRating),
                img: imageUrl
            };
            await axios.put(`http://localhost:8080/api/blogs/${id}`, dataToSubmit);
            toast.success('리뷰가 성공적으로 수정되었습니다!', { id: loadingToast });
            navigate(`/blogs/${id}`);
        } catch (err) {
            console.error("Update error:", err);
            toast.error('수정 중 오류가 발생했습니다.', { id: loadingToast });
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>로딩 중...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <div className="glass" style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ padding: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.75rem', color: 'var(--primary)' }}>
                        <Book size={28} />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>리뷰 수정하기</h2>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', padding: '1.5rem', background: 'rgba(0,0,0,0.02)', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
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
                                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'rgba(0,0,0,0.04)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'var(--text-main)', appearance: 'none' }}
                                >
                                    {[5, 4, 3, 2, 1].map(num => <option key={num} value={num} style={{ background: 'white', color: 'black' }}>{num}점</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem', alignItems: 'start' }}>
                        <div style={{ 
                            width: '200px', 
                            height: '280px', 
                            background: 'rgba(0,0,0,0.03)', 
                            border: '2px dashed var(--glass-border)', 
                            borderRadius: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'pointer'
                        }} onClick={() => document.getElementById('fileInput').click()}>
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                                    <Upload size={32} style={{ marginBottom: '0.5rem' }} />
                                    <div style={{ fontSize: '0.8rem' }}>책 표지 교체</div>
                                </div>
                            )}
                            <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <FormInput label="리뷰 제목" name="title" icon={<Type size={18} />} value={formData.title} onChange={handleChange} placeholder="리뷰를 한 줄로 요약해주세요" required />
                            
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>리뷰 내용</label>
                                <div style={{ position: 'relative' }}>
                                    <AlignLeft style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-muted)' }} size={18} />
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        placeholder="책을 읽고 느낀 점을 자유롭게 기록해보세요."
                                        style={{ width: '100%', minHeight: '180px', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.04)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'var(--text-main)', lineHeight: '1.6', resize: 'vertical' }}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={() => navigate(`/blogs/${id}`)} className="btn" style={{ flex: 1, justifyContent: 'center', background: 'rgba(0,0,0,0.02)' }} disabled={uploading}>
                            <X size={20} /> 취소
                        </button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }} disabled={uploading}>
                            <Save size={20} /> {uploading ? '수정 중...' : '수정 완료하기'}
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
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'rgba(0,0,0,0.04)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'var(--text-main)' }}
            />
        </div>
    </div>
);

export default BlogEdit;
