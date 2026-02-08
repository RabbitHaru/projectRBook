<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="jakarta.tags.core" prefix="c"%>
<%
String contextPath = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>글쓰기</title>
<link rel="stylesheet" href="/css/style.css">
</head>
<body>

	<%@ include file="header.jsp"%>

	<div class="main-container">
		<div class="form-container">
			<div class="container">
				<h2>📝 책 리뷰 작성</h2>

				<c:if test="${not empty error}">
					<div class="alert error">${error}</div>
				</c:if>

				<form action="<%=contextPath%>/blog/write.do" method="post"
					enctype="multipart/form-data">
					<h3
						style="color: #667eea; margin-bottom: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📖
						책 정보</h3>

					<label>📚 책 제목</label> <input type="text" name="bookTitle" required
						placeholder="책 제목을 입력하세요"> <label>✍️ 저자</label> <input
						type="text" name="bookAuthor" required placeholder="저자를 입력하세요">

					<label>🏢 출판사</label> <input type="text" name="bookPublisher"
						required placeholder="출판사를 입력하세요"> <label>⭐ 평점</label> <select
						name="bookRating" required
						style="padding: 12px; border: 2px solid #e9ecef; border-radius: 8px; font-size: 1rem;">
						<option value="">평점을 선택하세요</option>
						<option value="5">★★★★★ (5점) - 최고예요!</option>
						<option value="4">★★★★☆ (4점) - 매우 좋아요</option>
						<option value="3">★★★☆☆ (3점) - 좋아요</option>
						<option value="2">★★☆☆☆ (2점) - 그럭저럭</option>
						<option value="1">★☆☆☆☆ (1점) - 별로예요</option>
					</select>

					<h3
						style="color: #667eea; margin: 30px 0 20px 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📝
						리뷰 내용</h3>

					<label>리뷰 제목</label> <input type="text" name="title" required
						placeholder="리뷰 제목을 입력하세요"> <label>리뷰 내용</label>
					<textarea name="content" rows="10" required
						placeholder="책에 대한 생각과 느낀점을 자유롭게 작성해주세요"></textarea>

					<label>📷 책 사진</label> <input type="file" name="img"
						accept="image/*"> <small
						style="color: #666; display: block; margin-top: 5px;">책
						표지나 관련 이미지를 업로드해주세요</small>

					<div class="form-actions">
						<button type="submit" class="btn-submit">리뷰 작성하기</button>
						<a href="<%=contextPath%>/blog/list.do" class="btn-cancel">취소</a>
					</div>
				</form>
			</div>
		</div>
	</div>

</body>
</html>