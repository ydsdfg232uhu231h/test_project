
async function useHomeloader() {

            try {
                const response = await fetch("http://localhost:3000/api/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (!response.ok) {
                    return;
                }
                const data = await response.json();
                const orderedData = [...data].sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                return orderedData;
            } catch (error) {
             console.log(error.message);   
            }
}

export default useHomeloader;