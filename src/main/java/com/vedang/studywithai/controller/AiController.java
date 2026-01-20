package com.vedang.studywithai.controller;

import com.vedang.studywithai.service.AiService;
import com.vedang.studywithai.service.SearchEngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiController {

    @Autowired
    AiService aiService;

    @Autowired
    SearchEngineService searchEngineService;

    @GetMapping("/flashcards")
    public ResponseEntity<?> generateFlashcards(@RequestParam String notes) {
        String response = aiService.createFlashcards(notes);
        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(response);
    }

    @GetMapping("/quiz")
    public ResponseEntity<?> generateQuiz(@RequestParam String notes) {
        String response = aiService.createQuiz(notes);
        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(response);
    }

    @GetMapping("/summarise")
    public ResponseEntity<?> summarise(@RequestParam String notes) {
        String response = aiService.summarise(notes);
        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(response);
    }

    @GetMapping("/theoryAns")
    public ResponseEntity<?> createTheoryAnswer(@RequestParam String question, @RequestParam int marks) {
        String response = aiService.createTheoryAnswer(question, marks);
        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(response);
    }

    @GetMapping("/searchImg")
    public ResponseEntity<?> searchImg(@RequestParam String query) {
        searchEngineService.searchImages(query);
        return ResponseEntity.ok().body("");
    }




}
