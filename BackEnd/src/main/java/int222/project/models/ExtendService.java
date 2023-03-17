package int222.project.models;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.commons.io.IOUtils;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ExtendService {
	String folder = "./public/product-images/";

	public void saveImage(MultipartFile file, String fileName) throws Exception {
		byte[] bytes = file.getBytes();
		Path path = Paths.get(folder, fileName);
		Files.write(path, bytes);
	}

	public byte[] getFile(String file) throws IOException {
		Path path = Paths.get(folder, file);
		return IOUtils.toByteArray(path.toUri());
	}

	public void deleteImage(String fileName) throws Exception {
		Path path = Paths.get(folder, fileName);
		Files.delete(path);
	}

	public String randomString(int n) {
		String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";
		StringBuilder sb = new StringBuilder(n);
		for (int i = 0; i < n; i++) {
			int index = (int) (AlphaNumericString.length() * Math.random());
			sb.append(AlphaNumericString.charAt(index));
		}
		return sb.toString();
	}
}
