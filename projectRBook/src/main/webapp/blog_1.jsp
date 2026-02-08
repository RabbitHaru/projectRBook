<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>${post.title}</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css"/>
    <style>
      .post-image { max-width:100%; height:auto; border-radius:6px; margin-bottom:12px; }
      .post-content { white-space:pre-wrap; }
    </style>
</head>
<body>
<header>
    <h1><a href="${pageContext.request.contextPath}/blog/list">내 블로그</a></h1>
</header>

<main>
    <article>
        <h2>${post.title}</h2>
        <div class="post-meta">작성자 ${post.author} · ${post.createdAt}</div>

        <c:if test="${not empty post.imagePath}">
            <img class="post-image" src="${pageContext.request.contextPath}/uploads/${post.imagePath}" alt="${post.title}" />
        </c:if>

        <div class="post-content">
            <c:out value="${post.content}" escapeXml="false" />
            <!-- 만약 컨트롤러에서 HTML 허용 안하면 escapeXml="true"로 변경 -->
        </div>

        <div class="actions" style="margin-top:16px;">
            <a href="${pageContext.request.contextPath}/blog/edit?id=${post.id}">편집</a> |
            <a href="${pageContext.request.contextPath}/blog/delete?id=${post.id}" onclick="return confirm('정말 삭제?');">삭제</a> |
            <a href="${pageContext.request.contextPath}/blog/list">목록으로</a>
        </div>
    </article>
</main>

<footer>
    <small>&copy; My Blog</small>
</footer>
</body>
</html>
