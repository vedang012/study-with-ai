package com.vedang.studywithai.controller;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiController {

    Client client = new Client();

    @GetMapping("/ai")
    public ResponseEntity<?> response(@RequestParam String prompt) throws InterruptedException {
        GenerateContentResponse generatedContentResponse = client.models.generateContent("gemini-2.5-flash", prompt, null);
        return ResponseEntity.ok(generatedContentResponse.text());
    }

}
