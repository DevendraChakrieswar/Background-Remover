package com.devendra.removebg.service.impl;

import com.devendra.removebg.client.MlServiceClient;
import com.devendra.removebg.service.RemoveBackgroundService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class RemoveBackgroundServiceImpl implements RemoveBackgroundService {

    private final MlServiceClient mlServiceClient;

    @Override
    public byte[] removeBackground(MultipartFile file) {
        System.out.println("Inside Ml service");
        return mlServiceClient.removeBackground(file);
    }
}
