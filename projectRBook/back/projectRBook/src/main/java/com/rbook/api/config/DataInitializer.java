package com.rbook.api.config;

import com.rbook.api.entity.Blog;
import com.rbook.api.entity.User;
import com.rbook.api.repository.BlogRepository;
import com.rbook.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BlogRepository blogRepository;
    private final com.rbook.api.repository.CommentRepository commentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) return;

        User admin = User.builder().username("admin").password(passwordEncoder.encode("1234")).email("admin@rbook.com").name("관리자").build();
        User testUser = User.builder().username("testuser").password(passwordEncoder.encode("1234")).email("test@rbook.com").name("테스터").build();
        userRepository.saveAll(Arrays.asList(admin, testUser));

        Blog blog1 = Blog.builder()
                .title("지적인 대화를 위한 넓고 얕은 지식")
                .content("이 책을 읽고 나니 세상을 보는 시각이 훨씬 넓어진 느낌입니다. 철학, 과학, 예술을 넘나드는 지식의 향연이 즐거웠습니다.")
                .writer("관리자").username("admin").bookTitle("지적 대화").bookAuthor("채사장").bookPublisher("웨일북").bookRating(5)
                .img("https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400")
                .likesCount(12)
                .build();

        Blog blog2 = Blog.builder()
                .title("기술 부채를 줄이는 클린 코드 습관")
                .content("개발자로서 매일 마주하는 코드들에 대해 다시 생각해보게 되었습니다. 변수 이름 하나도 신중하게 지어야겠다는 다짐을 하게 되네요.")
                .writer("테스터").username("testuser").bookTitle("클린 코드").bookAuthor("로버트 마틴").bookPublisher("인사이트").bookRating(4)
                .img("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400")
                .likesCount(8)
                .build();

        Blog blog3 = Blog.builder()
                .title("마음의 평온을 찾는 명상 기록")
                .content("복잡한 도심 속에서 나만의 시간을 갖는 법을 배웠습니다. 호흡 하나에 집중하는 것만으로도 큰 위로가 되네요.")
                .writer("관리자").username("admin").bookTitle("고요한 마음").bookAuthor("이은주").bookPublisher("나무마음").bookRating(5)
                .img("https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400")
                .likesCount(25)
                .build();

        List<Blog> savedBlogs = blogRepository.saveAll(Arrays.asList(blog1, blog2, blog3));

        // 3. 더미 댓글 생성
        com.rbook.api.entity.Comment c1 = com.rbook.api.entity.Comment.builder()
                .blogId(savedBlogs.get(0).getId()).writer("테스터").username("testuser").content("저도 정말 감명 깊게 읽은 책이에요!").build();
        com.rbook.api.entity.Comment c2 = com.rbook.api.entity.Comment.builder()
                .blogId(savedBlogs.get(0).getId()).writer("관리자").username("admin").content("감사합니다. 채사장님 책은 정말 쉽게 잘 쓰여진 것 같아요.").build();
        com.rbook.api.entity.Comment c3 = com.rbook.api.entity.Comment.builder()
                .blogId(savedBlogs.get(1).getId()).writer("관리자").username("admin").content("클린 코드는 필독서죠! 내용 정리가 잘 되어 있네요.").build();

        commentRepository.saveAll(Arrays.asList(c1, c2, c3));

        System.out.println("✅ [RBook] 초기 더미 데이터(리뷰, 댓글, 좋아요)가 성공적으로 로드되었습니다.");
    }
}
