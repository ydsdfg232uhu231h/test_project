
async function useHomeloader() {

            try {
                const response = await fetch("https://test-project-gobd.onrender.com/api", {
                    method: "POST",
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