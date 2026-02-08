<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="jakarta.tags.core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>글 수정</title>
<link rel="stylesheet" href="/css/style.css">
</head>
<body>

	<%@ include file="header.jsp"%>

	<div class="main-container">
		<div class="form-container">
			<div class="container">
				<h2>✏️ 리뷰 수정</h2>

				<c:if test="${not empty param.error}">
					<div class="alert error">
						<c:choose>
							<c:when test="${param.error == 'empty_fields'}">제목과 내용을 입력해주세요.</c:when>
							<c:when test="${param.error == 'update_failed'}">수정에 실패했습니다.</c:when>
						</c:choose>
					</div>
				</c:if>

				<form action="${pageContext.request.contextPath}/blog/edit.do"
					method="post" enctype="multipart/form-data">
					<input type="hidden" name="id" value="${blog.id}">

					<h3
						style="color: #667eea; margin-bottom: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📖
						책 정보</h3>

					<label>📚 책 제목</label> <input type="text" name="bookTitle"
						value="${blog.bookTitle}" required placeholder="책 제목을 입력하세요">

					<label>✍️ 저자</label> <input type="text" name="bookAuthor"
						value="${blog.bookAuthor}" required placeholder="저자를 입력하세요">

					<label>🏢 출판사</label> <input type="text" name="bookPublisher"
						value="${blog.bookPublisher}" required placeholder="출판사를 입력하세요">

					<label>⭐ 평점</label> <select name="bookRating" required
						style="padding: 12px; border: 2px solid #e9ecef; border-radius: 8px; font-size: 1rem;">
						<option value="5" ${blog.bookRating == '5' ? 'selected' : ''}>★★★★★
							(5점) - 최고예요!</option>
						<option value="4" ${blog.bookRating == '4' ? 'selected' : ''}>★★★★☆
							(4점) - 매우 좋아요</option>
						<option value="3" ${blog.bookRating == '3' ? 'selected' : ''}>★★★☆☆
							(3점) - 좋아요</option>
						<option value="2" ${blog.bookRating == '2' ? 'selected' : ''}>★★☆☆☆
							(2점) - 그럭저럭</option>
						<option value="1" ${blog.bookRating == '1' ? 'selected' : ''}>★☆☆☆☆
							(1점) - 별로예요</option>
					</select>

					<h3
						style="color: #667eea; margin: 30px 0 20px 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📝
						리뷰 내용</h3>

					<label>리뷰 제목</label> <input type="text" name="title"
						value="${blog.title}" required placeholder="리뷰 제목을 입력하세요">

					<label>리뷰 내용</label>
					<textarea name="content" rows="10" required
						placeholder="책에 대한 생각과 느낀점을 자유롭게 작성해주세요">${blog.content}</textarea>

					<label>📷 책 사진</label> <input type="file" name="img"
						accept="image/*">
					<c:if test="${not empty blog.img}">
						<div
							style="margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 8px;">
							<strong>현재 이미지:</strong> ${blog.img} <br> <small>새로운
								이미지를 선택하면 기존 이미지가 교체됩니다</small>
						</div>
					</c:if>

					<div class="form-actions">
						<button type="submit" class="btn-submit">리뷰 수정하기</button>
						<a
							href="${pageContext.request.contextPath}/blog/view.do?id=${blog.id}"
							class="btn-cancel">취소</a>
					</div>
				</form>
			</div>
		</div>
	</div>

</body>
</html>