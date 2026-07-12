export async function getFruits() {
    const response = await fetch(
        "https://www.fruityvice.com/api/fruit/all"
    )
    return response.json()
}