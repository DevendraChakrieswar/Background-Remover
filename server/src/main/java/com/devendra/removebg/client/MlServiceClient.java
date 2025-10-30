package com.devendra.removebg.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "mlServiceClient", url = "${ml.service.base-url:http://localhost:5000}")
public interface MlServiceClient {

    @PostMapping(value = "/remove-bg", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    byte[] removeBackground(@RequestPart("image") MultipartFile file);
}


