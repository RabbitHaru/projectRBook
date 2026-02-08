<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="jakarta.tags.core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>BookBlog - 책 리뷰 커뮤니티</title>
<link rel="stylesheet" href="/css/style.css">
</head>
<body>

	<%@ include file="header.jsp"%>

	<div class="main-container">
		<div class="hero-section">
			<div class="hero-content">
				<h1 class="hero-title">독서의 즐거움을 나누세요! 📚</h1>
				<p class="hero-subtitle">다양한 책들의 리뷰와 감상을 공유하는 책 리뷰 커뮤니티에 오신 것을
					환영합니다</p>
				<a class="hero-btn"
					href="${pageContext.request.contextPath}/blog/list.do"> <span
					class="btn-text">리뷰 탐방하기</span> <span class="btn-arrow">→</span>
				</a>
			</div>
			<div class="hero-graphic">
				<div class="graphic-item">📖</div>
				<div class="graphic-item">✍️</div>
				<div class="graphic-item">⭐</div>
			</div>
		</div>

		<!-- 통계 섹션 -->
		<div class="stats-section">
			<div class="stat-item">
				<div class="stat-number">${totalBlogCount}</div>
				<div class="stat-label">총 리뷰 수</div>
			</div>
			<div class="stat-item">
				<div class="stat-number">${totalUserCount}</div>
				<div class="stat-label">회원 수</div>
			</div>
			<div class="stat-item">
				<div class="stat-number">📚</div>
				<div class="stat-label">책 사랑</div>
			</div>
		</div>
	</div>

</body>
</html>