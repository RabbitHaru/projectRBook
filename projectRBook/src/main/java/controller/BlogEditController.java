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

@WebServlet("/blog/edit.do")
@MultipartConfig(
    maxFileSize = 1024 * 1024 * 5,
    maxRequestSize = 1024 * 1024 * 10
)
public class BlogEditController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private BlogDAO blogDAO = new BlogDAO();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        HttpSession session = request.getSession();
        String currentUser = (String) session.getAttribute("username");
        
        if (currentUser == null) {
            response.sendRedirect("../login.jsp?error=login_required");
            return;
        }
        
        String idParam = request.getParameter("id");
        if (idParam == null || idParam.trim().isEmpty()) {
            response.sendRedirect("list.do?error=invalid_id");
            return;
        }
        
        int id = Integer.parseInt(idParam);
        BlogDTO blog = blogDAO.getBlogById(id);
        
        if (blog == null) {
            response.sendRedirect("list.do?error=not_found");
            return;
        }
        
        // 작성자 확인
        if (!blog.getWriter().equals(currentUser)) {
            response.sendRedirect("view.do?id=" + id + "&error=no_permission");
            return;
        }
        
        request.setAttribute("blog", blog);
        request.getRequestDispatcher("/edit.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        request.setCharacterEncoding("UTF-8");
        
        HttpSession session = request.getSession();
        String currentUser = (String) session.getAttribute("username");
        
        if (currentUser == null) {
            response.sendRedirect("../login.jsp?error=login_required");
            return;
        }

        String idParam = request.getParameter("id");
        String title = request.getParameter("title");
        String content = request.getParameter("content");
        String bookTitle = request.getParameter("bookTitle");
        String bookAuthor = request.getParameter("bookAuthor");
        String bookPublisher = request.getParameter("bookPublisher");
        String bookRating = request.getParameter("bookRating");

        if (idParam == null || idParam.trim().isEmpty()) {
            response.sendRedirect("list.do?error=invalid_id");
            return;
        }
        
        if (title == null || title.trim().isEmpty() || content == null || content.trim().isEmpty()) {
            response.sendRedirect("edit.do?id=" + idParam + "&error=empty_fields");
            return;
        }

        int id = Integer.parseInt(idParam);
        
        // 기존 글 정보 확인 및 권한 체크
        BlogDTO existingBlog = blogDAO.getBlogById(id);
        if (existingBlog == null) {
            response.sendRedirect("list.do?error=not_found");
            return;
        }
        
        if (!existingBlog.getWriter().equals(currentUser)) {
            response.sendRedirect("view.do?id=" + id + "&error=no_permission");
            return;
        }

        // 이미지 업로드 처리
        String imgPath = existingBlog.getImg();
        Part filePart = request.getPart("img");
        
        if (filePart != null && filePart.getSize() > 0) {
            String fileName = System.currentTimeMillis() + "_" + Paths.get(filePart.getSubmittedFileName()).getFileName().toString();
            String uploadPath = request.getServletContext().getRealPath("/upload");
            
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
        blog.setId(id);
        blog.setTitle(title.trim());
        blog.setContent(content.trim());
        blog.setImg(imgPath);
        blog.setBookTitle(bookTitle != null ? bookTitle.trim() : "");
        blog.setBookAuthor(bookAuthor != null ? bookAuthor.trim() : "");
        blog.setBookPublisher(bookPublisher != null ? bookPublisher.trim() : "");
        blog.setBookRating(bookRating != null ? bookRating : "0");

        boolean success = blogDAO.updateBlog(blog);
        
        if (success) {
            response.sendRedirect("view.do?id=" + id + "&msg=update_success");
        } else {
            response.sendRedirect("edit.do?id=" + id + "&error=update_failed");
        }
    }
}