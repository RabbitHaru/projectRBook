package com.rbook.api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "BLOG")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String content;

    @Column(length = 100, nullable = false)
    private String writer;

    @Column(length = 100)
    private String username;

    private String img;

    @Column(name = "BOOK_TITLE", length = 500)
    private String bookTitle;

    @Column(name = "BOOK_AUTHOR", length = 200)
    private String bookAuthor;

    @Column(name = "BOOK_PUBLISHER", length = 200)
    private String bookPublisher;

    @Column(name = "BOOK_RATING")
    private Integer bookRating;

    @Builder.Default
    @Column(name = "LIKES_COUNT")
    private int likesCount = 0;

    @CreationTimestamp
    @Column(name = "CREATED_AT", updatable = false)
    private LocalDateTime createdAt;

    @org.hibernate.annotations.UpdateTimestamp
    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;
}
