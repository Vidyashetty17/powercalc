package com.powercalc.model;

import java.time.LocalDateTime;
import java.util.List;

public class CalculationHistoryEntry {

    private String id;
    private LocalDateTime date;
    private List<Appliance> appliances;
    private double ratePerKwh;
    private double totalDailyUsage;
    private double totalMonthlyUsage;
    private double totalMonthlyCost;

    // Empty constructor (VERY IMPORTANT)
    public CalculationHistoryEntry() {
    }

    // Getters & Setters (VERY IMPORTANT)

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public List<Appliance> getAppliances() {
        return appliances;
    }

    public void setAppliances(List<Appliance> appliances) {
        this.appliances = appliances;
    }

    public double getRatePerKwh() {
        return ratePerKwh;
    }

    public void setRatePerKwh(double ratePerKwh) {
        this.ratePerKwh = ratePerKwh;
    }

    public double getTotalDailyUsage() {
        return totalDailyUsage;
    }

    public void setTotalDailyUsage(double totalDailyUsage) {
        this.totalDailyUsage = totalDailyUsage;
    }

    public double getTotalMonthlyUsage() {
        return totalMonthlyUsage;
    }

    public void setTotalMonthlyUsage(double totalMonthlyUsage) {
        this.totalMonthlyUsage = totalMonthlyUsage;
    }

    public double getTotalMonthlyCost() {
        return totalMonthlyCost;
    }

    public void setTotalMonthlyCost(double totalMonthlyCost) {
        this.totalMonthlyCost = totalMonthlyCost;
    }
}