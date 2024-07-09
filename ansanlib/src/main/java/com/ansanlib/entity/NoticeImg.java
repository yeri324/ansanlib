package com.ansanlib.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name="notice_img")
public class NoticeImg extends BaseEntity{
	
	@Id
	@Column(name = "notice_img_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String imgName; // 이미지 파일명
	private String oriImgName; // 원본 이미지 파일명
	private String imgUrl; // 이미지 조회 경로

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonBackReference
	@JoinColumn(name = "notice_num")
	private Notice notice;

	public void updateNoticeImg(String oriImgName, String imgName, String imgUrl) {
		this.oriImgName = oriImgName;
		this.imgName = imgName;
		this.imgUrl = imgUrl;
	}

}
