document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('resume-form');
    const downloadBtn = document.getElementById('download-btn');
    const output = document.getElementById('resume-output');

    if (!form || !downloadBtn || !output) {
        console.error('One or more elements are missing from the DOM.');
        return;
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const experience = document.getElementById('experience').value;

        output.innerHTML = `
            <h2>${name}</h2>
            <p><strong>Experience:</strong> ${experience}</p>
        `;

        const suggestion = await getAISuggestions(`Improve this job description: ${experience}`);
        output.innerHTML += `<p><strong>AI Suggestion:</strong> ${suggestion}</p>`;
    });

    downloadBtn.addEventListener('click', () => {
        html2pdf().from(output).save('My_Resume.pdf');
    });

    async function getAISuggestions(prompt) {
        const apiKey = 'api key'; // Replace with your real API key
    
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: 150
                })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('AI Response:', data); // Debug the API response
    
            if (!data.choices || data.choices.length === 0) {
                throw new Error('No suggestions found.');
            }
    
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('Error fetching AI suggestions:', error.message);
            return 'Unable to fetch suggestions at the moment.';
        }
    }
    let isFetching = false;

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (isFetching) {
        console.warn('Please wait before making another request.');
        return;
    }

    isFetching = true;

    const name = document.getElementById('name').value;
    const experience = document.getElementById('experience').value;

    output.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Experience:</strong> ${experience}</p>
    `;

    const suggestion = await getAISuggestions(`Improve this job description: ${experience}`);
    output.innerHTML += `<p><strong>AI Suggestion:</strong> ${suggestion}</p>`;

    isFetching = false;
});

    
});
