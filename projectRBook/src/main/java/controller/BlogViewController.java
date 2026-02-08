package controller;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import dao.BlogDAO;
import dto.BlogDTO;

@WebServlet("/blog/view.do")
public class BlogViewController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private BlogDAO blogDAO = new BlogDAO();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
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
        
        request.setAttribute("blog", blog);
        request.getRequestDispatcher("/view.jsp").forward(request, response);
    }
}