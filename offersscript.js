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
