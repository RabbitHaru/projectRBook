<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="jakarta.tags.core" prefix="c"%>
<%
    String contextPath = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${blog.title}</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>

<%@ include file="header.jsp" %>

<div class="main-container">
    <div class="single-container">
        <h1 class="single-title">${blog.title}</h1>
        
        <div class="view-meta">
            <span class="view-writer">✍️ 작성자: ${blog.writer}</span>
            <c:if test="${not empty blog.createdAt}">
                <span style="margin-left: 15px;">📅 ${blog.createdAt}</span>
            </c:if>
        </div>

        <!-- 책 정보 섹션 -->
        <div class="book-info">
            <h3>📚 책 정보</h3>
            <div class="book-details">
                <div class="book-detail-item">
                    <strong>제목:</strong> ${blog.bookTitle}
                </div>
                <div class="book-detail-item">
                    <strong>저자:</strong> ${blog.bookAuthor}
                </div>
                <div class="book-detail-item">
                    <strong>출판사:</strong> ${blog.bookPublisher}
                </div>
                <div class="book-detail-item">
                    <strong>평점:</strong> 
                    <span class="book-rating">
                        <c:forEach begin="1" end="5" var="i">
                            <c:choose>
                                <c:when test="${i <= blog.bookRating}">★</c:when>
                                <c:otherwise>☆</c:otherwise>
                            </c:choose>
                        </c:forEach>
                        (${blog.bookRating}/5)
                    </span>
                </div>
            </div>
        </div>

        <c:if test="${not empty blog.img}">
            <div class="view-image">
                <img src="<%=contextPath%>/${blog.img}" alt="${blog.bookTitle} 표지 이미지">
            </div>
        </c:if>

        <div class="single-content">
            ${blog.content}
        </div>

        <div class="single-btn-group">
            <a href="${pageContext.request.contextPath}/blog/list.do" class="single-btn">📋 목록으로</a>
            <c:if test="${sessionScope.username == blog.writer}">
                <a href="<%=contextPath%>/blog/edit.do?id=${blog.id}" class="single-btn">✏️ 수정</a>
                <a href="<%=contextPath%>/blog/delete.do?id=${blog.id}" class="single-btn" 
                   onclick="return confirm('정말 이 리뷰를 삭제하시겠습니까?')">🗑️ 삭제</a>
            </c:if>
        </div>
    </div>
</div>

</body>
</html>