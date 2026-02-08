package controller;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import dao.BlogDAO;
import dao.UserDAO;

@WebServlet("")
public class HomeController extends HttpServlet {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            BlogDAO blogDAO = new BlogDAO();
            UserDAO userDAO = new UserDAO();
            
            // contextPath를 JSP에 전달
            String contextPath = request.getContextPath();
            request.setAttribute("contextPath", contextPath);
            
            int totalBlogCount = blogDAO.getTotalBlogCount();
            int totalUserCount = userDAO.getTotalUserCount();
            
            request.setAttribute("totalBlogCount", totalBlogCount);
            request.setAttribute("totalUserCount", totalUserCount);
            
            request.getRequestDispatcher("/index.jsp").forward(request, response);
            
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect(request.getContextPath() + "/error.jsp");
        }
    }
}