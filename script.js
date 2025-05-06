document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // DOM elements
    const analyzeBtn = document.getElementById('analyzeBtn');
    const storeUrlInput = document.getElementById('storeUrl');
    const resultsSection = document.getElementById('results');
    const findingsContainer = document.getElementById('findings');
    const contactForm = document.getElementById('contactForm');
    const storeUrlHidden = document.getElementById('storeUrlHidden');
    const privacyLinks = document.querySelectorAll('[id^="privacyLink"]');
    const termsLink = document.getElementById('termsLink');
    const privacyModal = document.getElementById('privacyModal');
    const closeModal = document.querySelector('.close');
    
// Modal handlers
privacyLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        privacyModal.classList.remove('hidden');
    });
});

closeModal.addEventListener('click', function() {
    document.body.style.overflow = ''; // Re-enable scrolling
    privacyModal.classList.add('hidden');
});

window.addEventListener('click', function(e) {
    if (e.target === privacyModal) {
        document.body.style.overflow = ''; // Re-enable scrolling
        privacyModal.classList.add('hidden');
    }
});
    
    // Analyze button handler
    analyzeBtn.addEventListener('click', function() {
        const storeUrl = storeUrlInput.value.trim();
        
        if (!storeUrl) {
            alert('Please enter your Shopify store URL');
            return;
        }
        
        // Validate URL format
        if (!isValidShopifyUrl(storeUrl)) {
            alert('Please enter a valid Shopify store URL (e.g., yourstore.myshopify.com or yourstore.com)');
            return;
        }
        
        // Simulate analysis (in a real app, this would be an API call)
        simulateAnalysis(storeUrl);
    });
    
    // Contact form handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('userEmail').value.trim();
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // In a real app, you would send this data to your server
        alert(`Thank you! We'll contact you soon about optimizing ${storeUrlHidden.value}.`);
        contactForm.reset();
    });
    
    // Helper functions
    function isValidShopifyUrl(url) {
        // Basic validation - in reality you'd want more robust checking
        try {
            const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
            return parsedUrl.hostname.includes('.') && 
                  (parsedUrl.hostname.includes('myshopify.com') || 
                   !parsedUrl.hostname.includes('shopify.com'));
        } catch {
            return false;
        }
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function simulateAnalysis(storeUrl) {
        // Show loading state
        analyzeBtn.textContent = 'Analyzing...';
        analyzeBtn.disabled = true;
        
        // Store the URL for the contact form
        storeUrlHidden.value = storeUrl;
        
        // Simulate API delay
        setTimeout(function() {
            // Generate random findings to simulate analysis
            const findings = generateFindings();
            
            // Display results
            displayFindings(findings);
            
            // Reset button
            analyzeBtn.textContent = 'Analyze Checkout';
            analyzeBtn.disabled = false;
            
            // Show results section
            resultsSection.classList.remove('hidden');
            
            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }, 2000);
    }
    
    function generateFindings() {
        // This is simulated - in reality you'd analyze the actual checkout page
        const possibleFindings = [
            {
                type: 'warning',
                title: 'No Klaviyo SMS consent at checkout',
                description: 'You\'re missing out on SMS marketing opportunities by not collecting SMS consent during checkout.',
                recommendation: 'Add SMS opt-in checkbox with Klaviyo integration to grow your SMS list.'
            },
            {
                type: 'warning',
                title: 'Basic email collection only',
                description: 'Your checkout only collects basic email information without marketing consent.',
                recommendation: 'Implement Klaviyo post-purchase opt-in flows to grow your marketing list.'
            },
            {
                type: 'warning',
                title: 'No abandoned cart flow detected',
                description: 'We didn\'t detect triggers for abandoned cart recovery emails.',
                recommendation: 'Set up Klaviyo abandoned cart series to recover 10-15% of lost sales.'
            },
            {
                type: 'success',
                title: 'Email collection detected',
                description: 'Your checkout properly collects customer email addresses.',
                recommendation: 'Consider adding post-purchase flows to increase customer lifetime value.'
            }
        ];
        
        // Randomly select 3-4 findings to display
        const shuffled = possibleFindings.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3 + Math.floor(Math.random() * 2));
    }
    
    function displayFindings(findings) {
        findingsContainer.innerHTML = '';
        
        findings.forEach(finding => {
            const findingElement = document.createElement('div');
            findingElement.className = `finding ${finding.type}`;
            findingElement.innerHTML = `
                <h3>${finding.title}</h3>
                <p>${finding.description}</p>
                <p class="recommendation"><strong>Recommendation:</strong> ${finding.recommendation}</p>
            `;
            findingsContainer.appendChild(findingElement);
        });
    }
});
