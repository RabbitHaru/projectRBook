package com.rbook.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:5173")
public class UploadController {

    private final String UPLOAD_DIR = "uploads/";

    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("파일이 존재하지 않습니다.");
        }

        try {
            // 디렉토리 생성
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // 고유한 파일명 생성
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String savedFilename = UUID.randomUUID().toString() + extension;
            
            Path path = Paths.get(UPLOAD_DIR + savedFilename);
            Files.write(path, file.getBytes());

            // 클라이언트가 접근할 수 있는 URL 반환
            return ResponseEntity.ok("/uploads/" + savedFilename);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("파일 저장 중 오류가 발생했습니다.");
        }
    }
}
