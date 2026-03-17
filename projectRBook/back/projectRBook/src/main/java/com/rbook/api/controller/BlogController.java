package com.rbook.api.controller;

import com.rbook.api.entity.Blog;
import com.rbook.api.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // 리액트 기본 포트 허용
public class BlogController {

    private final BlogRepository blogRepository;

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogRepository.findAllByOrderByIdDesc();
    }

    @GetMapping("/user/{username}")
    public List<Blog> getMyBlogs(@PathVariable String username) {
        return blogRepository.findAllByUsernameOrderByIdDesc(username);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long id) {
        return blogRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Blog createBlog(@RequestBody Blog blog) {
        return blogRepository.save(blog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @RequestBody Blog blogDetails) {
        return blogRepository.findById(id)
                .map(blog -> {
                    blog.setTitle(blogDetails.getTitle());
                    blog.setContent(blogDetails.getContent());
                    blog.setImg(blogDetails.getImg());
                    blog.setBookTitle(blogDetails.getBookTitle());
                    blog.setBookAuthor(blogDetails.getBookAuthor());
                    blog.setBookPublisher(blogDetails.getBookPublisher());
                    blog.setBookRating(blogDetails.getBookRating());
                    return ResponseEntity.ok(blogRepository.save(blog));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Blog> likeBlog(@PathVariable Long id) {
        return blogRepository.findById(id)
                .map(blog -> {
                    blog.setLikesCount(blog.getLikesCount() + 1);
                    return ResponseEntity.ok(blogRepository.save(blog));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        return blogRepository.findById(id)
                .map(blog -> {
                    blogRepository.delete(blog);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
