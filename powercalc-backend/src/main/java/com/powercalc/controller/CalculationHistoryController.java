package com.powercalc.controller;

import com.powercalc.model.CalculationHistoryEntry;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.time.LocalDateTime;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/history")
public class CalculationHistoryController {

    private final Map<String, CalculationHistoryEntry> historyStore = new ConcurrentHashMap<>();

    // Get all history entries sorted descending by date
    @GetMapping
    public List<CalculationHistoryEntry> getAll() {
        List<CalculationHistoryEntry> list = new ArrayList<>(historyStore.values());
        list.sort((a, b) -> b.getDate().compareTo(a.getDate()));
        return list;
    }

    // Save a new calculation entry
    @PostMapping
    public ResponseEntity<?> saveEntry(@RequestBody CalculationHistoryEntry entry) {
        if (entry.getId() == null || entry.getId().isEmpty()) {
            entry.setId(UUID.randomUUID().toString());
        }
        if (entry.getDate() == null) {
            entry.setDate(LocalDateTime.now());
        }
        historyStore.put(entry.getId(), entry);
        return ResponseEntity.ok(entry);
    }

    // Delete by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEntry(@PathVariable String id) {
        if (historyStore.containsKey(id)) {
            historyStore.remove(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}