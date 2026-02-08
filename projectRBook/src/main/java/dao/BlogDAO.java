package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import dto.BlogDTO;

public class BlogDAO {

    private Connection getConnection() {
        Connection conn = null;
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            conn = DriverManager.getConnection(
                "jdbc:oracle:thin:@localhost:1521:ORCL", "musthave", "1234"
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
        return conn;
    }

    // 전체 블로그 가져오기 (책 정보 포함)
    public List<BlogDTO> getAllBlogs() {
        List<BlogDTO> list = new ArrayList<>();
        String sql = "SELECT ID, TITLE, CONTENT, IMG, WRITER, BOOK_TITLE, BOOK_AUTHOR, BOOK_PUBLISHER, BOOK_RATING, CREATED_AT FROM BLOG ORDER BY ID DESC";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                BlogDTO blog = new BlogDTO(
                    rs.getInt("ID"),
                    rs.getString("TITLE"),
                    rs.getString("CONTENT"),
                    rs.getString("WRITER"),
                    rs.getString("IMG"),
                    rs.getString("BOOK_TITLE"),
                    rs.getString("BOOK_AUTHOR"),
                    rs.getString("BOOK_PUBLISHER"),
                    rs.getString("BOOK_RATING"),
                    rs.getString("CREATED_AT")
                );
                list.add(blog);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    // 블로그 작성 (책 정보 포함) 
    public boolean insertBlog(BlogDTO blog) {
        String sql = "INSERT INTO BLOG (ID, TITLE, CONTENT, IMG, WRITER, BOOK_TITLE, BOOK_AUTHOR, BOOK_PUBLISHER, BOOK_RATING) VALUES (blog_seq.NEXTVAL, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, blog.getTitle());
            ps.setString(2, blog.getContent());
            ps.setString(3, blog.getImg());
            ps.setString(4, blog.getWriter());
            ps.setString(5, blog.getBookTitle());
            ps.setString(6, blog.getBookAuthor());
            ps.setString(7, blog.getBookPublisher());
            ps.setString(8, blog.getBookRating());

            int result = ps.executeUpdate();
            return result > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // 블로그 수정 (책 정보 포함)
    public boolean updateBlog(BlogDTO blog) {
        String sql = "UPDATE BLOG SET TITLE=?, CONTENT=?, IMG=?, BOOK_TITLE=?, BOOK_AUTHOR=?, BOOK_PUBLISHER=?, BOOK_RATING=? WHERE ID=?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, blog.getTitle());
            ps.setString(2, blog.getContent());
            ps.setString(3, blog.getImg());
            ps.setString(4, blog.getBookTitle());
            ps.setString(5, blog.getBookAuthor());
            ps.setString(6, blog.getBookPublisher());
            ps.setString(7, blog.getBookRating());
            ps.setInt(8, blog.getId());

            int result = ps.executeUpdate();
            return result > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // 블로그 삭제
    public boolean deleteBlog(int id) {
        String sql = "DELETE FROM BLOG WHERE ID=?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            int result = ps.executeUpdate();
            return result > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // 단일 블로그 조회 (책 정보 포함)
    public BlogDTO getBlogById(int id) {
        String sql = "SELECT ID, TITLE, CONTENT, IMG, WRITER, BOOK_TITLE, BOOK_AUTHOR, BOOK_PUBLISHER, BOOK_RATING, CREATED_AT FROM BLOG WHERE ID=?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new BlogDTO(
                        rs.getInt("ID"),
                        rs.getString("TITLE"),
                        rs.getString("CONTENT"),
                        rs.getString("WRITER"),
                        rs.getString("IMG"),
                        rs.getString("BOOK_TITLE"),
                        rs.getString("BOOK_AUTHOR"),
                        rs.getString("BOOK_PUBLISHER"),
                        rs.getString("BOOK_RATING"),
                        rs.getString("CREATED_AT")
                    );
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // 인기 게시물 가져오기 (책 정보 포함)
    public List<BlogDTO> getPopularBlogs() {
        List<BlogDTO> list = new ArrayList<>();
        String sql = "SELECT ID, TITLE, CONTENT, IMG, WRITER, BOOK_TITLE, BOOK_AUTHOR, BOOK_PUBLISHER, BOOK_RATING, CREATED_AT FROM BLOG ORDER BY CREATED_AT DESC";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                BlogDTO blog = new BlogDTO(
                    rs.getInt("ID"),
                    rs.getString("TITLE"),
                    rs.getString("CONTENT"),
                    rs.getString("WRITER"),
                    rs.getString("IMG"),
                    rs.getString("BOOK_TITLE"),
                    rs.getString("BOOK_AUTHOR"),
                    rs.getString("BOOK_PUBLISHER"),
                    rs.getString("BOOK_RATING"),
                    rs.getString("CREATED_AT")
                );
                list.add(blog);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }
    
    public int getTotalBlogCount() {
        String sql = "SELECT COUNT(*) AS total FROM BLOG";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            
            if (rs.next()) {
                return rs.getInt("total");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }
}