package com.vedang.studywithai.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class AiService {
    Client client = new Client();

    public String getAiResponseAsJson(String prompt) {
        GenerateContentConfig config = GenerateContentConfig.builder()
                .responseMimeType("application/json")
                .build();
        GenerateContentResponse response = client.models.generateContent("gemini-2.5-flash", prompt, config);
        return response.text();
    }


    public String createFlashcards(String notes) {
        String flashcardPrompt =
                "Convert the given notes into flashcards. "
                        + "Return ONLY a valid JSON array, no markdown, no explanation, no extra text. "
                        + "Each flashcard must have exactly two fields: \"question\" and \"answer\". "
                        + "Base all flashcards strictly on the provided notes.\n\n"
                        + "Notes:\n"
                        + notes;

        return getAiResponseAsJson(flashcardPrompt);
    }

    public String createQuiz(String notes) {
        String quizPrompt =
                "Convert the given notes into quiz questions"
                + "Return only a valid JSON array, no markdown, no explanation, no extra text. "
                + "Strictly follow these Rules : total 4 options, 3 incorrect options and 1 correct option, multiple correct options are not allowed"
                + "Each quiz question must have exactly 6 fields - \"question\", \"a\", \"b\", \"c\", \"d\", and the \"answer\""
                + "question is the question, a, b, c, d are the options and answer is the correction option"
                + "Create all questions strictly based on the provided notes. \n\n"
                + "Notes: \n"
                + notes;

        return getAiResponseAsJson(quizPrompt);

    }


}
