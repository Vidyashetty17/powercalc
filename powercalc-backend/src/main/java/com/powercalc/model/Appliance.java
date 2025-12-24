package com.powercalc.model;

public class Appliance {
    private String id;
    private String name;
    private double wattage;
    private int quantity;
    private double hours;

    // getters, setters, constructors

    public Appliance() {}
    public Appliance(String id, String name, double wattage, int quantity, double hours) {
        this.id = id;
        this.name = name;
        this.wattage = wattage;
        this.quantity = quantity;
        this.hours = hours;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getWattage() { return wattage; }
    public void setWattage(double wattage) { this.wattage = wattage; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public double getHours() { return hours; }
    public void setHours(double hours) { this.hours = hours; }
}