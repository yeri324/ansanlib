package com.ansanlib.entity;

import org.modelmapper.ModelMapper;

import com.ansanlib.board.dto.FaqDto;

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
@Getter
@Setter
@Table(name = "faq_img")
public class FaqImg extends BaseEntity {

	@Id
	@Column(name = "faq_img_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String imgName; // 이미지 파일명
	private String oriImgName; // 원본 이미지 파일명
	private String imgUrl; // 이미지 조회 경로

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "faq_num")
	private Faq faq;

	public void updateFaqImg(String oriImgName, String imgName, String imgUrl) {
		this.oriImgName = oriImgName;
		this.imgName = imgName;
		this.imgUrl = imgUrl;
	}
}
