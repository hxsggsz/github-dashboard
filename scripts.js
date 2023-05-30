let defaultUser = 'hxsggsz'
const form = document.getElementById('form')
const input = document.getElementById('input')
const error = document.getElementById('error')

async function getUser(user) {
  try {
    const res = await fetch(`https://api.github.com/users/${user === '' ? defaultUser : user}`)
    return res.json()
  } catch (er) {
    console.error(er)
    error.textContent = er.message
  }
}

getUser('')

form.addEventListener('submit', async (ev) => {
  ev.preventDefault()
  const user = await getUser(input.value)
  console.log(user)
})
