document.addEventListener('DOMContentLoaded', () => {
  // Predefined appliances data with icons as inline SVG paths
  const appliances = [
    { id:'airConditioner', name:'Air Conditioner', wattage:1500, svg:`<svg fill="none" viewBox="0 0 24 24" stroke="#677080" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" width="26" height="26"><path d="M3 9h18M5 13h14M6 17h12"/></svg>` },
    { id:'refrigerator', name:'Refrigerator', wattage:150, svg:`<svg fill="none" viewBox="0 0 24 24" stroke="#677080" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" width="26" height="26"><rect x="7" y="3" width="10" height="18"/></svg>` },
    { id:'television', name:'Television', wattage:100, svg:`<svg fill="none" viewBox="0 0 24 24" stroke="#677080" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" width="26" height="26"><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M8 21h8"/></svg>` },
    { id:'washingMachine', name:'Washing Machine', wattage:500, svg:`<svg fill="none" viewBox="0 0 24 24" stroke="#677080" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" width="26" height="26"><circle cx="12" cy="12" r="8"/><path d="M3 3l18 18"/></svg>` },
    { id:'microwave', name:'Microwave', wattage:1200, svg:`<svg fill="none" viewBox="0 0 24 24" stroke="#677080" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" width="26" height="26"><rect x="3" y="7" width="18" height="10"/><path d="M3 12h18"/></svg>` },
    { id:'waterHeater', name:'Water Heater', wattage:2000, svg:`<svg fill="none" viewBox="0 0 24 24" stroke="#677080" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" width="26" height="26"><path d="M12 3v18"/><circle cx="12" cy="12" r="9"/></svg>` },
    { id:'laptop', name:'Laptop', wattage:65, svg:`<svg fill="none" viewBox="0 0 24 24" stroke="#677080" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" width="26" height="26"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M3 18h18"/></svg>` },
    { id:'ceilingFan', name:'Ceiling Fan', wattage:75, svg:`<svg fill="none" viewBox="0 0 24 24" stroke="#677080" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" width="26" height="26"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/></svg>` },
    { id:'ledBulb', name:'LED Bulb', wattage:10, svg:`<svg fill="none" viewBox="0 0 24 24" stroke="#677080" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" width="26" height="26"><path d="M12 2a6 6 0 0 0-6 6c0 7 6 11 6 11s6-4 6-11a6 6 0 0 0-6-6z"/></svg>` },
    { id:'electricIron', name:'Electric Iron', wattage:1000, svg:`<svg fill="none" viewBox="0 0 24 24" stroke="#677080" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" width="26" height="26"><path d="M5 19h14M5 5h14M5 12h14"/></svg>` },
    { id:'dishwasher', name:'Dishwasher', wattage:1800, svg:`<svg fill="none" viewBox="0 0 24 24" stroke="#677080" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" width="26" height="26"><rect x="4" y="4" width="16" height="16"/></svg>` },
    { id:'desktopComputer', name:'Desktop Computer', wattage:200, svg:`<svg fill="none" viewBox="0 0 24 24" stroke="#677080" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" width="26" height="26"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 18h10"/></svg>` }
  ];

  const applianceGrid = document.getElementById('appliance-grid');
  const selectedList = document.getElementById('selected-appliances-list');
  const countSelected = document.getElementById('count-selected');
  const rateInput = document.getElementById('rate-kwh');
  const estimatedCostElem = document.getElementById('estimated-cost');
  const dailyUsageElem = document.getElementById('daily-usage');
  const monthlyUsageElem = document.getElementById('monthly-usage');
  const btnAddCustom = document.getElementById('btn-add-custom');
  const modalCustom = document.getElementById('modal-custom-appliance');
  const customNameInput = document.getElementById('custom-name');
  const customWattageInput = document.getElementById('custom-wattage');
  const customAddBtn = document.getElementById('custom-add-btn');
  const customCancelBtn = document.getElementById('custom-cancel-btn');
  const btnSaveCalc = document.getElementById('btn-save');

  // Tab buttons and sections
  const tabCalculator = document.getElementById('tab-calculator');
  const tabHistory = document.getElementById('tab-history');
  const tabTips = document.getElementById('tab-tips');
  const calcSection = document.getElementById('calculator-section');
  const historySection = document.getElementById('history-section');
  const tipsSection = document.getElementById('tips-section');

  // History
  const historyList = document.getElementById('history-list');

  // State
  let selectedAppliances = []; // Each: {id, name, wattage, quantity, hours}
  let calculationHistory = []; // Loaded from localStorage

  // Initialize the appliance grid
  function renderApplianceGrid() {
    applianceGrid.innerHTML = '';
    appliances.forEach(app => {
      const btn = document.createElement('button');
      btn.className = 'appliance-button';
      btn.setAttribute('data-id', app.id);
      btn.innerHTML = `
        <div class="icon">${app.svg}</div>
        <div class="name">${app.name}</div>
        <div class="wattage">${app.wattage}W</div>
      `;
      btn.addEventListener('click', () => {
        toggleApplianceSelection(app);
      });
      applianceGrid.appendChild(btn);
    });
  }

  // Toggle appliance selection
  function toggleApplianceSelection(app) {
    const idx = selectedAppliances.findIndex(a => a.id === app.id);
    if (idx > -1) {
      // Remove
      selectedAppliances.splice(idx, 1);
    } else {
      // Add with default quantity=1, hours=8
      selectedAppliances.push({ ...app, quantity: 1, hours: 8 });
    }
    renderSelectedAppliances();
    updateApplianceGridSelection();
    calculateEstimate();
  }

  // Update the selected state in appliance grid
  function updateApplianceGridSelection() {
    const buttons = applianceGrid.querySelectorAll('button.appliance-button');
    buttons.forEach(btn => {
      const id = btn.getAttribute('data-id');
      if(selectedAppliances.find(a => a.id === id)) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });
  }

  // Render list of selected appliances
  function renderSelectedAppliances() {
    countSelected.textContent = selectedAppliances.length;
    if(selectedAppliances.length === 0) {
      selectedList.innerHTML = '<p class="empty-text">No appliances added yet<br />Select appliances above to get started</p>';
      return;
    }
    selectedList.innerHTML = '';
    selectedAppliances.forEach((app, idx) => {
      const div = document.createElement('div');
      div.className = 'selected-item';

      div.innerHTML = `
        <div class="selected-item-info">
          <span>${app.name}</span>
          <div class="selected-inputs">
            <label>Quantity</label>
            <input type="number" min="1" step="1" value="${app.quantity}" data-idx="${idx}" data-field="quantity" />
            <label>Hours/Day</label>
            <input type="number" min="0" step="0.1" value="${app.hours}" data-idx="${idx}" data-field="hours" />
          </div>
          <div class="selected-item-calc">${app.wattage}W × ${app.quantity} × ${app.hours}h = <strong>${((app.wattage * app.quantity * app.hours) / 1000).toFixed(2)}</strong> kWh/day</div>
        </div>
        <button class="btn-delete" title="Remove appliance" data-idx="${idx}" aria-label="Delete appliance">&times;</button>
      `;
      selectedList.appendChild(div);
    });

    // Add event listeners for quantity and hours inputs and remove buttons
    selectedList.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = e.target.getAttribute('data-idx');
        const field = e.target.getAttribute('data-field');
        const val = parseFloat(e.target.value);
        if(!isNaN(val) && val >= 0) {
          selectedAppliances[idx][field] = val;
          renderSelectedAppliances();
          calculateEstimate();
        }
      });
    });

    selectedList.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-idx');
        selectedAppliances.splice(idx, 1);
        renderSelectedAppliances();
        updateApplianceGridSelection();
        calculateEstimate();
      });
    });
  }

  // Calculate estimate and update UI
  function calculateEstimate() {
    if(selectedAppliances.length === 0) {
      estimatedCostElem.textContent = '₹0.00';
      dailyUsageElem.textContent = '0.00 kWh';
      monthlyUsageElem.textContent = '0.00 kWh';
      btnSaveCalc.disabled = true;
      return;
    }

    const rate = parseFloat(rateInput.value);
    if(isNaN(rate) || rate < 0) {
      estimatedCostElem.textContent = '₹0.00';
      dailyUsageElem.textContent = '0.00 kWh';
      monthlyUsageElem.textContent = '0.00 kWh';
      btnSaveCalc.disabled = true;
      return;
    }

    // Calculate total daily usage kWh
    let totalDailyKwh = 0;
    selectedAppliances.forEach(app => {
      totalDailyKwh += (app.wattage * app.quantity * app.hours) / 1000;
    });
    const totalMonthlyKwh = totalDailyKwh * 30;

    // Calculate total monthly cost
    const totalMonthlyCost = rate * totalMonthlyKwh;

    estimatedCostElem.textContent = `₹${totalMonthlyCost.toFixed(2)}`;
    dailyUsageElem.textContent = `${totalDailyKwh.toFixed(2)} kWh`;
    monthlyUsageElem.textContent = `${totalMonthlyKwh.toFixed(2)} kWh`;

    btnSaveCalc.disabled = false;
    return { totalMonthlyCost, totalDailyKwh, totalMonthlyKwh };
  }

  // Modal logic for custom appliance
  btnAddCustom.addEventListener('click', () => {
    modalCustom.classList.remove('hidden');
    customNameInput.value = '';
    customWattageInput.value = '';
    customNameInput.focus();
  });
  customCancelBtn.addEventListener('click', () => {
    modalCustom.classList.add('hidden');
  });

  customAddBtn.addEventListener('click', () => {
    const name = customNameInput.value.trim();
    const wattage = parseFloat(customWattageInput.value);
    if(!name) {
      alert('Please enter a valid appliance name.');
      customNameInput.focus();
      return;
    }
    if(isNaN(wattage) || wattage <= 0) {
      alert('Please enter a valid wattage greater than 0.');
      customWattageInput.focus();
      return;
    }
    // Add custom appliance with random id
    const customId = 'custom_' + Date.now();
    const newAppliance = {
      id: customId,
      name,
      wattage,
      svg: `<svg fill="none" viewBox="0 0 24 24" stroke="#677080" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" width="26" height="26"><circle cx="12" cy="12" r="10"/></svg>`
    };
    appliances.push(newAppliance);
    // Add to selected directly, quantity=1, hours=8
    selectedAppliances.push({ ...newAppliance, quantity: 1, hours: 8 });
    renderApplianceGrid();
    renderSelectedAppliances();
    updateApplianceGridSelection();
    calculateEstimate();
    modalCustom.classList.add('hidden');
  });

  // Tabs switching
  function switchTab(tab) {
    tabCalculator.classList.remove('active');
    tabHistory.classList.remove('active');
    tabTips.classList.remove('active');
    calcSection.classList.add('hidden');
    historySection.classList.add('hidden');
    tipsSection.classList.add('hidden');

    if(tab === 'calculator') {
      tabCalculator.classList.add('active');
      calcSection.classList.remove('hidden');
    } else if(tab === 'history') {
      tabHistory.classList.add('active');
      historySection.classList.remove('hidden');
      renderHistory();
    } else if(tab === 'tips') {
      tabTips.classList.add('active');
      tipsSection.classList.remove('hidden');
    }
  }
  tabCalculator.addEventListener('click', () => switchTab('calculator'));
  tabHistory.addEventListener('click', () => switchTab('history'));
  tabTips.addEventListener('click', () => switchTab('tips'));

  // Save calculation to history
  btnSaveCalc.addEventListener('click', () => {
    const rate = parseFloat(rateInput.value);
    if(selectedAppliances.length === 0 || isNaN(rate)) return;
    const calcData = calculateEstimate();

    // Data for saving
    const saveEntry = {
      id: 'calc_' + Date.now(),
      date: new Date().toISOString(),
      appliances: JSON.parse(JSON.stringify(selectedAppliances)), // deep copy
      rate: rate,
      totalMonthlyCost: calcData.totalMonthlyCost,
      totalDailyUsage: calcData.totalDailyKwh,
      totalMonthlyUsage: calcData.totalMonthlyKwh
    };
    // Save to localStorage
    calculationHistory.unshift(saveEntry);
    if(calculationHistory.length > 50) {
      calculationHistory.pop();
    }
    localStorage.setItem('powercalc-history', JSON.stringify(calculationHistory));
    alert('Calculation saved successfully!');
  });

  // Render history list
  function renderHistory() {
    if(calculationHistory.length === 0) {
      historyList.innerHTML = '<p class="empty-text">No past calculations found</p>';
      return;
    }
    historyList.innerHTML = '';
    calculationHistory.forEach(item => {
      const div = document.createElement('div');
      div.className = 'history-item';
      const dateStr = new Date(item.date).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
      div.innerHTML = `
        <div class="history-item-header">
          <span>${dateStr}</span>
          <button class="btn-delete-history" data-id="${item.id}" title="Delete this record">&times;</button>
        </div>
        <div class="history-item-subinfo">
          <span>⚡ Total Usage <strong>${item.totalMonthlyUsage.toFixed(0)} kWh</strong></span>
          <span>$ Rate <strong>₹${item.rate.toFixed(2)}/kWh</strong></span>
          <span>📈 Daily Cost <strong>₹${(item.rate * item.totalDailyUsage).toFixed(2)}</strong></span>
        </div>
        <div class="history-item-details" id="details-${item.id}">
          <a href="#" class="toggle-details" data-id="${item.id}">View Appliance Details</a>
          <div class="appliance-details hidden" id="appliances-${item.id}">
            ${item.appliances.map(ap => {
              const monthlyKwh = (ap.wattage * ap.quantity * ap.hours * 30) / 1000;
              const monthlyCost = monthlyKwh * item.rate;
              return `<div class="appliance-line">
                <div>${ap.name}</div>
                <div>₹${monthlyCost.toFixed(2)}</div>
              </div>`;
            }).join('')}
          </div>
        </div>
      `;
      historyList.appendChild(div);
    });

    // Add event listeners for delete buttons
    historyList.querySelectorAll('.btn-delete-history').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.getAttribute('data-id');
        if(confirm('Are you sure you want to delete this record?')) {
          calculationHistory = calculationHistory.filter(item => item.id !== id);
          localStorage.setItem('powercalc-history', JSON.stringify(calculationHistory));
          renderHistory();
        }
      });
    });

    // Toggle appliance details
    historyList.querySelectorAll('.toggle-details').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        const detailsDiv = document.getElementById('appliances-' + id);
        if(detailsDiv.classList.contains('hidden')) {
          detailsDiv.classList.remove('hidden');
          e.target.textContent = 'Hide Appliance Details';
        } else {
          detailsDiv.classList.add('hidden');
          e.target.textContent = 'View Appliance Details';
        }
      });
    });
  }

  // Load history from localStorage
  function loadHistory() {
    const stored = localStorage.getItem('powercalc-history');
    if(stored) {
      try {
        calculationHistory = JSON.parse(stored);
      } catch(e) {
        calculationHistory = [];
      }
    }
  }

  // Listen to changes in electricity rate input
  rateInput.addEventListener('input', () => {
    calculateEstimate();
  });

  // Initialization
  renderApplianceGrid();
  renderSelectedAppliances();
  updateApplianceGridSelection();
  loadHistory();
  calculateEstimate();

  switchTab('calculator');
});