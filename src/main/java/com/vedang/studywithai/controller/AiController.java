package com.vedang.studywithai.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.json.JSONObject;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AiController {

    @Autowired
    private ChatModel chatModel;
    private long lastCallTime = 0;


    @GetMapping("/ai")
    public String response(@RequestParam String prompt) throws InterruptedException {

        long now = System.currentTimeMillis();
        if (now - lastCallTime < 3000) {
            Thread.sleep(3000);
        }
        lastCallTime = System.currentTimeMillis();


        ChatResponse response = chatModel.call(new Prompt(prompt));
        return response.getResult().toString();
    }


    @GetMapping("/ai2")
    public String newresponse(@RequestParam String prompt) {

        OkHttpClient client = new OkHttpClient();

        String json = """
    {
      "contents": [
        {
          "parts": [
            { "text": "%s" }
          ]
        }
      ]
    }
    """.formatted(prompt.replace("\"", "\\\""));

        RequestBody body = RequestBody.create(
                json,
                MediaType.parse("application/json; charset=utf-8")
        );

        Request request = new Request.Builder()
                .url("https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=AIzaSyABtI_CY6plus7DD4qa8WfyDND2OCnxI2o")
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {

            if (!response.isSuccessful() || response.body() == null) {
                return "Failed: " + response.code() + " " + response.message();
            }

            String apiResponse = response.body().string();

            JSONObject jsonObject = new JSONObject(apiResponse);

            return jsonObject
                    .getJSONArray("candidates")
                    .getJSONObject(0)
                    .getJSONObject("content")
                    .getJSONArray("parts")
                    .getJSONObject(0)
                    .getString("text");

        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
}
