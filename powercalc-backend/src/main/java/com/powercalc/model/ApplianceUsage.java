package com.powercalc.model;

public class ApplianceUsage {
    private String name;
    private double wattage;
    private int quantity;
    private double hours;

    public ApplianceUsage() {}

    public ApplianceUsage(String name, double wattage, int quantity, double hours) {
        this.name = name;
        this.wattage = wattage;
        this.quantity = quantity;
        this.hours = hours;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getWattage() { return wattage; }
    public void setWattage(double wattage) { this.wattage = wattage; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getHours() { return hours; }
    public void setHours(double hours) { this.hours = hours; }
}
