package dto;

public class BlogDTO {
	private int id;
	private String title;
	private String content;
	private String writer;
	private String img;
	private String bookTitle; // 책 제목
	private String bookAuthor; // 저자
	private String bookPublisher; // 출판사
	private String bookRating; // 평점 (1-5)
	private String createdAt; // 작성일

	public BlogDTO() {
	}

	public BlogDTO(int id, String title, String content, String writer, String img, String bookTitle, String bookAuthor,
			String bookPublisher, String bookRating, String createdAt) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.writer = writer;
		this.img = img;
		this.bookTitle = bookTitle;
		this.bookAuthor = bookAuthor;
		this.bookPublisher = bookPublisher;
		this.bookRating = bookRating;
		this.createdAt = createdAt;
	}

	// Getter / Setter
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getBookTitle() {
		return bookTitle;
	}

	public void setBookTitle(String bookTitle) {
		this.bookTitle = bookTitle;
	}

	public String getBookAuthor() {
		return bookAuthor;
	}

	public void setBookAuthor(String bookAuthor) {
		this.bookAuthor = bookAuthor;
	}

	public String getBookPublisher() {
		return bookPublisher;
	}

	public void setBookPublisher(String bookPublisher) {
		this.bookPublisher = bookPublisher;
	}

	public String getBookRating() {
		return bookRating;
	}

	public void setBookRating(String bookRating) {
		this.bookRating = bookRating;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
}