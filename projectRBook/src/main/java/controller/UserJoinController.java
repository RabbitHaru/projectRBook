package controller;

import dao.UserDAO;
import dto.UserDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/join.do")
public class UserJoinController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private UserDAO userDAO = new UserDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getRequestDispatcher("/join.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        request.setCharacterEncoding("UTF-8");

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String email = request.getParameter("email");

        System.out.println("회원가입 시도: " + username + ", " + email);

        if (username == null || username.trim().isEmpty() || 
            password == null || password.trim().isEmpty() ||
            email == null || email.trim().isEmpty()) {
            System.out.println("필드 누락");
            response.sendRedirect("join.jsp?error=empty_fields");
            return;
        }

        UserDTO user = new UserDTO();
        user.setUsername(username.trim());
        user.setPassword(password.trim());
        user.setEmail(email.trim());

        boolean success = userDAO.joinUser(user);

        System.out.println("회원가입 결과: " + success);

        if (success) {
            response.sendRedirect("login.jsp?msg=join_success");
        } else {
            response.sendRedirect("join.jsp?error=join_failed");
        }
    }
}