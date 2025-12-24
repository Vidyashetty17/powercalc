package com.powercalc.controller;

import com.powercalc.model.CalculationEntry;
import com.powercalc.service.CalculationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calculation")
public class CalculationController {

    @Autowired
    private CalculationService calculationService;

    @PostMapping("/save")
    public ResponseEntity<CalculationEntry> saveCalculation(@RequestBody CalculationEntry entry) {
        CalculationEntry saved = calculationService.saveCalculation(entry);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/history")
    public ResponseEntity<List<CalculationEntry>> getHistory() {
        List<CalculationEntry> history = calculationService.getAllCalculations();
        return ResponseEntity.ok(history);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCalculation(@PathVariable String id) {
        CalculationEntry entry = calculationService.getCalculation(id);
        if (entry == null) {
            return ResponseEntity.notFound().build();
        }
        calculationService.deleteCalculation(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CalculationEntry> getCalculation(@PathVariable String id) {
        CalculationEntry entry = calculationService.getCalculation(id);
        if (entry == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(entry);
    }
}
