package com.projectcloud.cloudproject.DAO;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.projectcloud.cloudproject.model.UserAndFileData;

public interface userFileRep extends JpaRepository<UserAndFileData, Integer> {
	
	@Query("select u from UserAndFileData u where u.username = ?1")
	List<UserAndFileData> fileDetails(String username);
	
	@Transactional
	@Modifying
	@Query("delete from UserAndFileData u where u.username = ?1 and u.keyName = ?2 ")
	void deleteFile(String username, String filename);
	
	
	@Query("select username,max(u.uploadTime) as recentdate,sum(u.sizeOfFile),count(u.username),"+
			"( select u.keyName from  UserAndFileData u where " +
			   "u.uploadTime=(select max(u.uploadTime) from UserAndFileData u " +
					   ")) as filename" +
					  " from UserAndFileData u " +
					   "  group by username ")
	List<String> adminList();

}
