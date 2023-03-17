package int222.project.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import int222.project.exceptions.AllException;
import int222.project.exceptions.ExceptionResponse;
import int222.project.models.User;
import int222.project.repositories.UserJpaRepositories;

@RestController

public class UserController {
	@Autowired
	UserJpaRepositories userRepo;

	@GetMapping("/admin/users")
	public List<User> getAllUser() {
		return userRepo.findAll();
	};

	@GetMapping("/user/getbyname")
	public User getAllUser(Authentication authen) {
		User user = userRepo.findByUserName(authen.getName()).get();
		if(user.getStatus().equals("inactive")) {
			throw new AllException(ExceptionResponse.ERROR_CODE.NOT_NULL,
					"this account inactive please contact the admin!!"  );
		}
		return user;
	};

	@PostMapping("/register")
	public User postUser(@RequestBody User user) {// orrequestBody
		if(!userRepo.findByUserName(user.getUserName()).isEmpty()){
			throw new AllException(ExceptionResponse.ERROR_CODE.NAME_DUPLICATE,
					"this name:" + user.getUserName() + " has been use pls change user name!!"  );
		}
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String pw = passwordEncoder.encode(user.getPassword());
		user.setPassword(pw);
		return userRepo.save(user);
	}

	@PutMapping("/user/edituser")//   b crypt checkด้วย
	public User editUser(@RequestBody User user,Authentication authen) {

		User userOld = userRepo.findById(user.getUserId()).get();
		
		if(!userOld.getUserName().equals(authen.getName())) {
			throw new AllException(ExceptionResponse.ERROR_CODE.USER_NOT_MATCH, "please edit your account only" );
		}
		if(!user.getUserName().equals( userOld.getUserName()) &&!userRepo.findByUserName(user.getUserName()).isEmpty()){
			throw new AllException(ExceptionResponse.ERROR_CODE.NAME_DUPLICATE,
					"this name:" + user.getUserName() + " has been use. pls change user name!!");
		}
//		if(!userOld.getPassword().equals(oldPassword)) {//ใช้เป็น b crypt check
//			throw new AllException(ExceptionResponse.ERROR_CODE.PASSWORD_NOT_MATCH,
//					"this password is not match pls enter u old password!!");
//		}
		userOld.setUserName(user.getUserName());
//		userOld.setPassword(user.getPassword());
		userOld.setAddress(user.getAddress());
		userOld.setTel(user.getTel());
		userOld.setFullName(user.getFullName());
		userOld.setRole(user.getRole());
		return userRepo.save(userOld);
	}
	
	// password change 
	@PutMapping("/user/changepassword")
	public String changePass(@RequestParam String newPassword,@RequestParam String oldPassword,Authentication authen) {
		User user = userRepo.findByUserName(authen.getName()).get();
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

		if(!passwordEncoder.matches(oldPassword,user.getPassword() )) {//ใช้เป็น b crypt check
			throw new AllException(ExceptionResponse.ERROR_CODE.PASSWORD_NOT_MATCH,
					"this password is not match pls enter u old password!!");
		}
		user.setPassword(passwordEncoder.encode(newPassword));
		userRepo.save(user);
		return "change success";
	}

	//promote role 
	@PutMapping("/admin/promoteuser/{id}")
	public String promoteUser(@PathVariable int id,@RequestParam String role) {
		Optional<User> usero = userRepo.findById(id);
		if (usero.isEmpty()) {
			throw new AllException(ExceptionResponse.ERROR_CODE.DOES_NOT_FIND_ID,
					"id: {" + id + "} Does not fine Id!!");
		}
		if(!(role.equals("admin") || role.equals("user") || role.equals("seller"))) {
			throw new AllException(ExceptionResponse.ERROR_CODE.ROLE_NOT_MATCH,
					"our website dont has this "+role+" role");
		}
		User user = usero.get();
		user.setRole("ROLE_"+role.toUpperCase());
		userRepo.save(user);
		return user.getUserName()+" has been change role to "+role;
	}

	
	// promote user 
	@PutMapping("/user/promotTo")
	public String promoteUserTo(Authentication authen,@RequestParam String role) {
		if(!( role.equals("user") || role.equals("seller"))) {
			throw new AllException(ExceptionResponse.ERROR_CODE.ROLE_NOT_MATCH,
					"our website dont has this "+role+" role");
		}
		Optional<User> usero = userRepo.findByUserName(authen.getName());
		User user = usero.get();
		user.setRole("ROLE_"+role.toUpperCase());
		userRepo.save(user);
		return user.getUserName()+" has been change role to "+role;
	}
	@DeleteMapping("/admin/delete/{id}") // change name
	public String deleteUser(@PathVariable int id) {
		Optional<User> userO =  userRepo.findById(id);
		User user = userO.get();
		if(userO.isEmpty()) {
			throw new AllException(ExceptionResponse.ERROR_CODE.NOT_NULL,
					"don't has this user id !"  );
		}if (!user.getProduct().isEmpty() || !user.getUserOrder().isEmpty()) {
			user.setStatus("inactive");
			userRepo.save(user);
		}
		else 
		userRepo.deleteById(id);
		
		return "delete success";
	}
	@PutMapping("/admin/edituser")//   b crypt checkด้วย
	public User editUser(@RequestBody User user) {
		User userOld = userRepo.findById(user.getUserId()).get();
		
		if(!user.getUserName().equals( userOld.getUserName()) &&!userRepo.findByUserName(user.getUserName()).isEmpty()){
			throw new AllException(ExceptionResponse.ERROR_CODE.NAME_DUPLICATE,
					"this name:" + user.getUserName() + " has been use. pls change user name!!");
		}
//		if(!userOld.getPassword().equals(oldPassword)) {//ใช้เป็น b crypt check
//			throw new AllException(ExceptionResponse.ERROR_CODE.PASSWORD_NOT_MATCH,
//					"this password is not match pls enter u old password!!");
//		}
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		if(user.getPassword() != null && !passwordEncoder.matches(user.getPassword(), userOld.getPassword()) && !user.getPassword().equals(userOld.getPassword()) ){
		String pw = passwordEncoder.encode(user.getPassword());
		userOld.setPassword(pw);
			}
		userOld.setUserName(user.getUserName());
		
		userOld.setAddress(user.getAddress());
		userOld.setTel(user.getTel());
		userOld.setFullName(user.getFullName());
		userOld.setRole(user.getRole());
		userOld.setStatus(user.getStatus());
		return userRepo.save(userOld);
	}
//	@GetMapping("/user/thisuser")
//	public String currentUser(Authentication authen) {
//		return authen.getName();
//	}
//	@Transactional
//	public UserDetails loadUserBysUserName(String username) throws UsernameNotFoundException {
//		User user = userRepo.findByUserName(username)
//				.orElseThrow(() -> new UsernameNotFoundException("no username ni" + username));
//		return UserPrinciple.build(user);
//	}
//	@GetMapping("/encryptallpassword")
//	public List<String> eA() {
//		List<User> users = userRepo.findAll();
//		List<String> list = new ArrayList<String>();
//		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//		for (int i = 0; i < users.size(); i++) {
//			User u = users.get(i);
//			String pw = passwordEncoder.encode(u.getPassword());
//			list.add(u.getUserName()+"   "+pw);
//		}
//		return list;
//	}
}
