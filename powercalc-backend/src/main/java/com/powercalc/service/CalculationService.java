package com.powercalc.service;

import com.powercalc.model.CalculationEntry;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class CalculationService {
    private final Map<String, CalculationEntry> calculationStore = new ConcurrentHashMap<>();

    public CalculationEntry saveCalculation(CalculationEntry entry) {
        if (entry.getId() == null || entry.getId().isEmpty()) {
            entry.setId(UUID.randomUUID().toString());
        }
        if (entry.getTimestamp() == null) {
            entry.setTimestamp(LocalDateTime.now());
        }
        calculationStore.put(entry.getId(), entry);
        return entry;
    }

    public List<CalculationEntry> getAllCalculations() {
        List<CalculationEntry> list = new ArrayList<>(calculationStore.values());
        list.sort((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()));
        return list;
    }

    public void deleteCalculation(String id) {
        calculationStore.remove(id);
    }

    public CalculationEntry getCalculation(String id) {
        return calculationStore.get(id);
    }
}
