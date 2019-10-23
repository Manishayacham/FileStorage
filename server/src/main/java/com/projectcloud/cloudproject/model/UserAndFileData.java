package com.projectcloud.cloudproject.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class UserAndFileData {
	
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
    @Column(name = "userId")
	private String username;
	
	@Column(name="uploadtime", columnDefinition="DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	private Date uploadTime;
	
	@Column(name="updateTime", columnDefinition="DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	private Date updateTime;
	
	@Column(name="description")
	private String description;
	
	@Column(name="keyname")
	private String keyName;
	
	@Column(name="sizeOfFile")
	private float sizeOfFile;
	
	
	public float getSizeOfFile() {
		return sizeOfFile;
	}

	public void setSizeOfFile(float sizeOfFile) {
		this.sizeOfFile = sizeOfFile;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Date getUploadTime() {
		return uploadTime;
	}

	public void setUploadTime(Date uploadTime) {
		this.uploadTime = uploadTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getKeyName() {
		return keyName;
	}

	public void setKeyName(String keyName) {
		this.keyName = keyName;
	}

	
	
	

}

