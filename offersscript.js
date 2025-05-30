document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    const offersParam = params.get('offers'); // e.g., "1,2,3"
    const selectedOffers = offersParam ? offersParam.split(',').map(id => `offer-${id.trim()}`) : null;

    // Filter offer cards
    const offerCards = document.querySelectorAll('.offer-card');
    offerCards.forEach(card => {
        const offerId = card.getAttribute('data-id');
        if (selectedOffers && !selectedOffers.includes(offerId)) {
            card.style.display = 'none';
            card.setAttribute('aria-hidden', 'true');
        } else {
            card.style.display = 'flex';
            card.setAttribute('aria-hidden', 'false');
        }
    });
});

function loadCharts(bp) {
  fetch('bp-chart-data.json')
    .then(res => res.json())
    .then(data => {
      const bpData = data[bp];
      if (!bpData) return;

      // Interaction Category Chart
      const ctx1 = document.getElementById('interactionChart').getContext('2d');
      new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: Object.keys(bpData.interactionCategories),
          datasets: [{
            label: 'Interaction Frequency',
            data: Object.values(bpData.interactionCategories),
            backgroundColor: '#00AA62'
          }]
        }
      });

      // Program Participation Chart
      const ctx2 = document.getElementById('programChart').getContext('2d');
      const programs = Object.entries(bpData.programParticipation)
        .map(([label, status]) => ({ label, value: status ? 1 : 0 }));
      new Chart(ctx2, {
        type: 'pie',
        data: {
          labels: programs.map(p => p.label),
          datasets: [{
            data: programs.map(p => p.value),
            backgroundColor: ['#00AA62', '#ccc', '#007364']
          }]
        }
      });

      // Happiness Chart
      const ctx3 = document.getElementById('happinessChart').getContext('2d');
      new Chart(ctx3, {
        type: 'bar',
        data: {
          labels: ['Agent', 'Digital'],
          datasets: [{
            label: 'Happiness Score',
            data: [bpData.channelHappiness.Agent, bpData.channelHappiness.Digital],
            backgroundColor: ['#007364', '#00AA62']
          }]
        }
      });
    });
}
