package com.rbook.api.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "USERS") // 오라클 'USER'는 예약어일 가능성이 높아 'USERS'로 설정하거나 확인 필요
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    private String name;
}
