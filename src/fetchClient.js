const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchClient = async (url, options = {}) => {
    options.credentials = 'include';

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, options);

        // If the response is not ok, throw an error
        if (!response.ok) {
            if (response.status === 401) {
                // Throw specific error for unauthorized
                throw new Error('Unauthorized');
            }
            throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the JSON response
        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export default fetchClient;
