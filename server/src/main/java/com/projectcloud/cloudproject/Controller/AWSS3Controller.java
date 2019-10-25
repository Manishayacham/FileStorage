package com.projectcloud.cloudproject.Controller;

import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.time.Instant;
import java.util.Date;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.projectcloud.cloudproject.model.UserAndFileData;
import com.projectcloud.cloudproject.service.AWSS3ServiceImpl;

@RestController
@CrossOrigin(origins = "*")
public class AWSS3Controller {
	
	Logger logger = Logger.getLogger("mylog"); 
	@Autowired	
	private AWSS3ServiceImpl s3Service;
	
	//UploadFile Functionality
		
	@RequestMapping(value = "/firstpage", method = RequestMethod.POST)
    public String uploadFile( MultipartFile file,
        @RequestParam String username, @RequestParam String description ) throws IOException {
		try {
			UserAndFileData userFile = new UserAndFileData();
			userFile.setUsername(username);
			userFile.setDescription(description);
			userFile.setUploadTime(DateTime.now().toDate());
			userFile.setKeyName(file.getOriginalFilename());
			userFile.setSizeOfFile(file.getSize());
		
	        return this.s3Service.uploadFileToS3(file, userFile);
		}catch (Exception e) {
			e.printStackTrace();
			logger.log(Level.SEVERE, "upload failed");
		}
		
		return "File upload failed";
    }
	
	//Functionality for retrieving list of files of a user
	
	@RequestMapping(value = "/list/{username}", method = RequestMethod.GET)
    public List<UserAndFileData> listOfFiles( @PathVariable String username)  {
		
			return this.s3Service.listOfS3Objects(username);
    }
	
	
	//Functionality for retrieving user details for displaying in admin page
	
	@RequestMapping(value = "/adminlist", method = RequestMethod.GET)
    public List<String> adminList()  {
		try {
			return this.s3Service.adminList();
		}catch (Exception e) {
			e.printStackTrace();
			logger.log(Level.SEVERE, "retrieving list failed");
		}
		return null;
    }
	
	//Functionality to delete a file
	
	@RequestMapping(value = "/delete/{username}/{filename}", method = RequestMethod.DELETE)
    public String deleteFile(@PathVariable String username,@PathVariable String filename)  {
		try {
			return  this.s3Service.deleteFile(username,filename);
		}catch (Exception e) {
			e.printStackTrace();
			logger.log(Level.SEVERE, "delete failed");
		}
		return "delete failed";
    }
	
	
	//Functionality for update
	
	@RequestMapping(value = "/updateFile", method = RequestMethod.POST)
    public String updateFile( MultipartFile file,
        @RequestParam String username, @RequestParam String description, @RequestParam String oldFileName,  @RequestParam String uploadTime) throws IOException {
		
		String message = "Update failed";
		
			try {
		
				this.s3Service.deleteFile(username, oldFileName);
				
				UserAndFileData userFile = new UserAndFileData();
				userFile.setUsername(username);
				userFile.setDescription(description);
				Date date = Date.from(Instant.parse(uploadTime));
				userFile.setUploadTime(date);
				userFile.setUpdateTime(DateTime.now().toDate());
				userFile.setKeyName(file.getOriginalFilename());
				userFile.setSizeOfFile(file.getSize());
		        this.s3Service.uploadFileToS3(file, userFile);
		        
		        message = "Updated successfully";
			
		        return message;
			}catch (Exception e) {
				e.printStackTrace();
				logger.log(Level.SEVERE, "delete failed");
			}
			
			return "update failed";
    }
}
