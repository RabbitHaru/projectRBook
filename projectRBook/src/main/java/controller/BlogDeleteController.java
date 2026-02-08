package controller;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import dao.BlogDAO;

@WebServlet("/blog/delete.do")
public class BlogDeleteController extends HttpServlet {
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
        
        // 권한 체크
        var existingBlog = blogDAO.getBlogById(id);
        if (existingBlog == null) {
            response.sendRedirect("list.do?error=not_found");
            return;
        }
        
        if (!existingBlog.getWriter().equals(currentUser)) {
            response.sendRedirect("view.do?id=" + id + "&error=no_permission");
            return;
        }

        boolean success = blogDAO.deleteBlog(id);
        
        if (success) {
            response.sendRedirect("list.do?msg=delete_success");
        } else {
            response.sendRedirect("view.do?id=" + id + "&error=delete_failed");
        }
    }
}