-- RBook 더미 데이터 삽입 스크립트

-- 1. 사용자 더미 데이터 (비밀번호는 '1234'의 BCrypt 암호화 해시 예시입니다)
-- 실제 테스트 시에는 가입 기능을 통해 직접 생성하는 것을 권장합니다.
INSERT INTO USERS (username, password, email, name) VALUES 
('admin', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.7u41Wny', 'admin@rbook.com', '관리자'),
('testuser', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.7u41Wny', 'test@rbook.com', '테스터');

-- 2. 책 리뷰 더미 데이터
INSERT INTO BLOG (title, content, writer, username, book_title, book_author, book_publisher, book_rating, img, created_at, updated_at) VALUES 
(
    '인생의 의미를 다시 생각하게 하는 책', 
    '데미안을 읽고 나서 자아를 찾는 여정이 얼마나 중요한지 깨달았습니다. 문장 하나하나가 예술이네요.', 
    '관리자', 'admin', 
    '데미안', '헤르만 헤세', '민음사', 5, 
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    NOW(), NOW()
),
(
    '기술서적의 바이블, 클린 코드', 
    '좋은 코드를 짜기 위한 원칙들이 아주 잘 정리되어 있습니다. 개발자라면 반드시 읽어야 할 필독서입니다.', 
    '테스터', 'testuser', 
    '클린 코드', '로버트 C. 마틴', '인사이트', 4, 
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=400',
    NOW(), NOW()
),
(
    '초보자도 읽기 쉬운 경제학 서적', 
    '경제학이 이렇게 재미있을 줄 몰랐어요. 실생활 예시가 많아서 이해하기 정말 좋았습니다.', 
    '관리자', 'admin', 
    '부의 시나리오', '오건영', '페이지2', 5, 
    'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&q=80&w=400',
    NOW(), NOW()
);
