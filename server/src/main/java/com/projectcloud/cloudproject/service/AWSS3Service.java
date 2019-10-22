package com.projectcloud.cloudproject.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.projectcloud.cloudproject.model.UserAndFileData;

public interface AWSS3Service {
	
	String uploadFileToS3(MultipartFile multipartFile, UserAndFileData userFile) throws IOException;
	List<UserAndFileData> listOfS3Objects(String userNmae);
	String deleteFile(String username,String fileName);
	List<String> adminList();

}
