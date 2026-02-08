<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="jakarta.tags.core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>회원가입</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>

<%@ include file="header.jsp" %>

<div class="main-container">
    <div class="form-container">
        <div class="container">
            <h2>📝 회원가입</h2>
            
            <c:if test="${not empty param.error}">
                <div class="alert error">
                    <c:choose>
                        <c:when test="${param.error == 'empty_fields'}">모든 필드를 입력해주세요.</c:when>
                        <c:when test="${param.error == 'join_failed'}">회원가입에 실패했습니다.</c:when>
                    </c:choose>
                </div>
            </c:if>
            
            <form action="${pageContext.request.contextPath}/join.do" method="post">
                <label for="username">아이디</label>
                <input type="text" name="username" id="username" required placeholder="아이디를 입력하세요">
                
                <label for="email">이메일</label>
                <input type="email" name="email" id="email" required placeholder="이메일을 입력하세요">
                
                <label for="password">비밀번호</label>
                <input type="password" name="password" id="password" required placeholder="비밀번호를 입력하세요">
                
                <button type="submit" class="btn-submit" style="width: 100%; margin-top: 10px;">회원가입</button>
            </form>
            
            <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; margin-bottom: 15px;">이미 계정이 있으신가요?</p>
                <a href="${pageContext.request.contextPath}/login.do" class="btn-cancel" style="display: inline-block;">로그인</a>
            </div>
        </div>
    </div>
</div>

</body>
</html>