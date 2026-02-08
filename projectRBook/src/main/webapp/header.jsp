<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<div class="header_navbar">
    <div class="header-container">
        <div class="header-left">
            <a href="${pageContext.request.contextPath}/index.jsp" class="navbar-brand">
                <!-- <img src="${pageContext.request.contextPath}/images/logo.png" alt="Book Blog"> -->
                BookBlog
            </a>
        </div>
        <div class="header-center">
            <ul class="navbar-custom">
                <li><a href="${pageContext.request.contextPath}/index.jsp" class="nav-link <c:if test="${param.currentPage == 'home'}">active</c:if>">홈</a></li>
                <li><a href="${pageContext.request.contextPath}/blog/list.do" class="nav-link <c:if test="${param.currentPage == 'blog'}">active</c:if>">블로그</a></li>
            </ul>
        </div>
        <div class="header-right">
            <c:choose>
                <c:when test="${not empty sessionScope.username}">
                    <span class="welcome-text">안녕하세요, ${sessionScope.username}님</span>
                    <a href="${pageContext.request.contextPath}/logout.do" class="btn btn-logout">로그아웃</a>
                </c:when>
                <c:otherwise>
                    <a href="${pageContext.request.contextPath}/login.do" class="btn btn-login">로그인</a>
                    <a href="${pageContext.request.contextPath}/join.do" class="btn btn-join">회원가입</a>
                </c:otherwise>
            </c:choose>
        </div>
    </div>
</div>