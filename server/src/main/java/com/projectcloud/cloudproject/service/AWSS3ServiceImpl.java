package com.projectcloud.cloudproject.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.projectcloud.cloudproject.DAO.userFileRep;
import com.projectcloud.cloudproject.model.UserAndFileData;

@Service
public class AWSS3ServiceImpl implements AWSS3Service{
	
		
	private AmazonS3 s3client;
	

    @Value("${endpointUrl}")
    private String endpointUrl;
    @Value("${bucketName}")
    private String bucketName;
    @Value("${accessKey}")
    private String accessKey;
    @Value("${secretKey}")
    private String secretKey;
    @Autowired
	private userFileRep userrep;
    
	@PostConstruct
    private void connectAmazon() {
        AWSCredentials awsCredss = new BasicAWSCredentials(this.accessKey, this.secretKey);
        this.s3client =  AmazonS3ClientBuilder
        		  .standard()
        		  .withCredentials(new AWSStaticCredentialsProvider(awsCredss))
        		  .withRegion(Regions.US_EAST_1)
        		  .build();
    }
	
	private File convertMultipart(MultipartFile file) throws IOException {
		File file1 = new File(file.getOriginalFilename());
        FileOutputStream fileOutput = new FileOutputStream(file1);
        fileOutput.write(file.getBytes());
        fileOutput.close();
        return file1;
	}
	
	public String uploadFileToS3(MultipartFile multipartFile, UserAndFileData userFile) throws IOException{
		
		
		try {
			
			File file = convertMultipart(multipartFile);
			System.out.println(multipartFile.getOriginalFilename());
			String fileName=multipartFile.getOriginalFilename().replace(" ", "_");
			ObjectMetadata metaData = new ObjectMetadata();
			metaData.setContentDisposition("attachment");
			
			PutObjectRequest fileObject = new PutObjectRequest(bucketName, userFile.getUsername()+"/"+fileName, file);
			fileObject.setMetadata(metaData);
			fileObject.withCannedAcl(CannedAccessControlList.PublicRead);
			s3client.putObject(fileObject);
			userrep.save(userFile);
			System.out.println("done");
			
	 	} catch (Exception e) {
         e.printStackTrace();
      }
				
	 return "uploaded sucessfully";
	}
	
	public List<UserAndFileData> listOfS3Objects(String userNmae){
	
		return userrep.fileDetails(userNmae);
	}
	

	
	public String deleteFile(String username,String fileName) {
		try {
			s3client.deleteObject(bucketName,username+"/"+ fileName.replace(" ", "_"));
			userrep.deleteFile(username,fileName);
			return "Deleted sucessfully " + fileName;
			}catch (Exception e) {
				e.printStackTrace();
				return "Delete failed for " + fileName;
			}	
	}
	
	public List<String> adminList(){
		return userrep.adminList();
	}
	
	
}
