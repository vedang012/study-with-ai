package com.vedang.studywithai.controller;

import com.vedang.studywithai.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiController {

    @Autowired
    AiService aiService;

    @GetMapping("/flashcards")
    public ResponseEntity<?> generateFlashcards(String notes) {
        String response = aiService.createFlashcards(notes);
        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(response);
    }

    @GetMapping("/quiz")
    public ResponseEntity<?> generateQuiz(String notes) {
        String response = aiService.createQuiz(notes);
        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(response);
    }

}
