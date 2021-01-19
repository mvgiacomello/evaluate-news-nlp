async function evaluate(postURL) {
    console.log('Fetching', postURL);
    const response = await fetch('http://localhost:8081/evaluate', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'postURL': postURL })
    });
    const jsonBody = await response.json();
    console.log(jsonBody)
    try {
        return `Agreement: ${jsonBody.agreement} \n Subjectivity: ${jsonBody.subjectivity} \n Irony: ${jsonBody.irony} \n Confidence: ${jsonBody.confidence}% \n URL: ${postURL}`
    } catch (error) {
        return 'Unable to retrieve the result'
    }
}

export { evaluate }