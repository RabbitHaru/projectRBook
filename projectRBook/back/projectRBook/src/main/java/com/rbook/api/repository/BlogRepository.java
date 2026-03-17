package com.rbook.api.repository;

import com.rbook.api.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findAllByOrderByIdDesc();
    List<Blog> findAllByUsernameOrderByIdDesc(String username);
}
