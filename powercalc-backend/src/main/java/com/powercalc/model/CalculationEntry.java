package com.powercalc.model;

import java.time.LocalDateTime;
import java.util.List;

public class CalculationEntry {
    private String id;
    private List<ApplianceUsage> appliances;
    private double rate;
    private double totalMonthlyCost;
    private double totalDailyUsage;
    private double totalMonthlyUsage;
    private LocalDateTime timestamp;

    public CalculationEntry() {}

    public CalculationEntry(String id, List<ApplianceUsage> appliances, double rate,
                          double totalMonthlyCost, double totalDailyUsage,
                          double totalMonthlyUsage, LocalDateTime timestamp) {
        this.id = id;
        this.appliances = appliances;
        this.rate = rate;
        this.totalMonthlyCost = totalMonthlyCost;
        this.totalDailyUsage = totalDailyUsage;
        this.totalMonthlyUsage = totalMonthlyUsage;
        this.timestamp = timestamp;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public List<ApplianceUsage> getAppliances() { return appliances; }
    public void setAppliances(List<ApplianceUsage> appliances) { this.appliances = appliances; }

    public double getRate() { return rate; }
    public void setRate(double rate) { this.rate = rate; }

    public double getTotalMonthlyCost() { return totalMonthlyCost; }
    public void setTotalMonthlyCost(double totalMonthlyCost) { this.totalMonthlyCost = totalMonthlyCost; }

    public double getTotalDailyUsage() { return totalDailyUsage; }
    public void setTotalDailyUsage(double totalDailyUsage) { this.totalDailyUsage = totalDailyUsage; }

    public double getTotalMonthlyUsage() { return totalMonthlyUsage; }
    public void setTotalMonthlyUsage(double totalMonthlyUsage) { this.totalMonthlyUsage = totalMonthlyUsage; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
