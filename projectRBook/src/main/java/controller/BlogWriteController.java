package controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import jakarta.servlet.http.HttpSession;
import dao.BlogDAO;
import dto.BlogDTO;

@WebServlet("/blog/write.do")
@MultipartConfig(
    maxFileSize = 1024 * 1024 * 5,
    maxRequestSize = 1024 * 1024 * 10
)
public class BlogWriteController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private BlogDAO blogDAO = new BlogDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        
        HttpSession session = req.getSession();
        if (session.getAttribute("username") == null) {
            resp.sendRedirect("../login.jsp?error=login_required");
            return;
        }
        req.getRequestDispatcher("/write.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        
        req.setCharacterEncoding("UTF-8");
        
        HttpSession session = req.getSession();
        String writer = (String) session.getAttribute("username");
        
        if (writer == null) {
            resp.sendRedirect("../login.jsp?error=login_required");
            return;
        }

        String title = req.getParameter("title");
        String content = req.getParameter("content");
        String bookTitle = req.getParameter("bookTitle");
        String bookAuthor = req.getParameter("bookAuthor");
        String bookPublisher = req.getParameter("bookPublisher");
        String bookRating = req.getParameter("bookRating");
        
        if (title == null || title.trim().isEmpty() || content == null || content.trim().isEmpty()) {
            req.setAttribute("error", "제목과 내용을 입력해주세요.");
            req.getRequestDispatcher("/write.jsp").forward(req, resp);
            return;
        }

        // 이미지 업로드 처리
        String imgPath = null;
        Part filePart = req.getPart("img");
        
        if (filePart != null && filePart.getSize() > 0) {
            String fileName = System.currentTimeMillis() + "_" + Paths.get(filePart.getSubmittedFileName()).getFileName().toString();
            String uploadPath = req.getServletContext().getRealPath("/upload");
            
            // 업로드 디렉토리 생성
            Path uploadDir = Paths.get(uploadPath);
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
            
            // 파일 저장
            Path filePath = uploadDir.resolve(fileName);
            filePart.write(filePath.toString());
            imgPath = "upload/" + fileName;
        }

        BlogDTO blog = new BlogDTO();
        blog.setTitle(title.trim());
        blog.setContent(content.trim());
        blog.setWriter(writer);
        blog.setImg(imgPath);
        blog.setBookTitle(bookTitle != null ? bookTitle.trim() : "");
        blog.setBookAuthor(bookAuthor != null ? bookAuthor.trim() : "");
        blog.setBookPublisher(bookPublisher != null ? bookPublisher.trim() : "");
        blog.setBookRating(bookRating != null ? bookRating : "0");

        boolean success = blogDAO.insertBlog(blog);
        
        if (success) {
            resp.sendRedirect("list.do?msg=write_success");
        } else {
            req.setAttribute("error", "글쓰기에 실패했습니다.");
            req.getRequestDispatcher("/write.jsp").forward(req, resp);
        }
    }
}