import axios from 'axios';

/**
 * RBook 테스트를 위해 백엔드에 더미 데이터를 전송하는 스크립트입니다.
 * 서버가 켜진 상태에서 실행하거나, 특정 버튼에 연결해 사용할 수 있습니다.
 */
export const insertDummyData = async () => {
    const dummyReviews = [
        {
            title: '가장 아름다운 어린 왕자 리뷰',
            content: '어른이 되어 다시 읽으니 눈물이 나네요. 내가 잊고 있었던 순수함을 일깨워주는 책입니다.',
            bookTitle: '어린 왕자',
            bookAuthor: '생텍쥐페리',
            bookPublisher: '열린책들',
            bookRating: 5,
            img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
            writer: '사용자1',
            username: 'user1'
        },
        {
            title: '효율적인 협업을 위한 지침서',
            content: '팀 내 커뮤니케이션과 코드 리뷰의 중요성을 다시 한번 느꼈습니다.',
            bookTitle: '함께 자라기',
            bookAuthor: '김창준',
            bookPublisher: '인사이트',
            bookRating: 4,
            img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=400',
            writer: '개발자킴',
            username: 'devkim'
        }
    ];

    try {
        for (const review of dummyReviews) {
            await axios.post('http://localhost:8080/api/blogs', review);
        }
        console.log('✅ 더미 데이터 삽입 성공');
        alert('더미 리뷰가 추가되었습니다! 목록을 확인해 보세요.');
    } catch (err) {
        console.error('❌ 더미 데이터 삽입 실패', err);
    }
};
