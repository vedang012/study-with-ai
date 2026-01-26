package com.vedang.studywithai.service;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SearchEngineService {
    @Value("${searchengine.url}")
    private String SEARCH_ENGINE_URL;

    public void searchImages(String query) {
        System.out.println(SEARCH_ENGINE_URL);
        OkHttpClient client = new OkHttpClient();


        Request request = new Request.Builder()
                .url(SEARCH_ENGINE_URL + "&fileType=jpg&q=" + query)
                .get()
                .build();

        try (Response response = client.newCall(request).execute()) {

            if (!response.isSuccessful()) {
                throw new RuntimeException("Request failed: " + response.code());
            }

            assert response.body() != null;
            String body = response.body().string();
            System.out.println(body);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } 

    }
}
