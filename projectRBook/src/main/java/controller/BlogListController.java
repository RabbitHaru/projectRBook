package controller;

import java.io.IOException;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import dao.BlogDAO;
import dto.BlogDTO;

@WebServlet("/blog/list.do")
public class BlogListController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private BlogDAO blogDAO = new BlogDAO();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        List<BlogDTO> blogList = blogDAO.getAllBlogs();
        request.setAttribute("blogList", blogList);
        request.getRequestDispatcher("/blog.jsp").forward(request, response);
    }
}