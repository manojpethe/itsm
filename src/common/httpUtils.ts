class Http {

    async get (URL: string): Promise<{ data: any; errorMessage: any; }>{
        let data = null;
        let errorMessage = "";

        try {
            const response = await fetch(URL);
            
            // fetch() only rejects on network errors; manually check for HTTP errors (404, 500, etc.)
            if (!response.ok) {
                errorMessage = "Something went wrong!";
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            data = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            errorMessage = "There was an error while fetching data..";
            data = [];
        }
        return {data , errorMessage};
    }

    async post(URL: string, data:any): Promise<{ data: any; errorMessage: any; }> {
        let responseData = null;
        let errorMessage = "";

        try {
            responseData = await fetch(URL, { method: "POST", body: JSON.stringify(data)});
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        return {data: responseData , errorMessage};
    }

    patch() {
    }

    delete() {
    }

}

export default Http;