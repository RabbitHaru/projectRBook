package com.rbook.api.controller;

import com.rbook.api.entity.Comment;
import com.rbook.api.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {

    private final CommentRepository commentRepository;

    @GetMapping("/blog/{blogId}")
    public List<Comment> getComments(@PathVariable Long blogId) {
        return commentRepository.findAllByBlogIdOrderByCreatedAtDesc(blogId);
    }

    @PostMapping
    public Comment addComment(@RequestBody Comment comment) {
        return commentRepository.save(comment);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id) {
        commentRepository.deleteById(id);
    }
}
