export const createUser = async (email, password) => {
  
  const url = 'http://localhost:8000/auth/register'

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: email,
      password
    })
  })

  if (!response.ok) {
    // obtener mensaje de error de la respuesta del endpoint
    const data = await response.json()
    
    // disparar error
    throw new Error(data.message)
  }


}