let defaultUser = 'hxsggsz'
const form = document.getElementById('form')
const input = document.getElementById('input')
const name = document.getElementById('name')
const img = document.getElementById('img')
const date = document.getElementById('date')
const userName = document.getElementById('username')
const bioDesktop = document.querySelector('.desktop')
const bioMobile = document.querySelector('.mobile')
const repos = document.getElementById('repos')
const followers = document.getElementById('followers')
const following = document.getElementById('following')
const local = document.getElementById('location')
const twitter = document.getElementById('twitter')
const github = document.getElementById('github')
const company = document.getElementById('company')

function setUser(data) {
  const formatedDate = new Intl.DateTimeFormat('en-US', { 
      year: 'numeric',
      day: 'numeric',
      month: 'short',
  })

  const formatNumber = new Intl.NumberFormat('en-US', { notation: 'compact' })

  name.textContent = data.name
  img.src = data.avatar_url
  img.alt = `avatar do ${data.login}`
  bioDesktop.textContent = data.bio ? data.bio : 'this user does not have bio'
  bioMobile.textContent = data.bio ? data.bio : 'this user does not have bio'
  userName.textContent = `@${data.login}`
  date.textContent = `Joined ${formatedDate.format(new Date(data.created_at))}`

  repos.textContent = data.public_repos
  followers.textContent = formatNumber.format(data.followers)
  following.textContent = formatNumber.format(data.following)

  local.innerHTML = data.location ? `
    <i class="ph-bold ph-map-pin"></i>
    <p>${data.location}</p>
    ` : `
    <i class="ph-bold ph-map-pin disabled"></i>
    <p class="disabled">not available</p>
    `
  twitter.innerHTML = data.twitter_username ? `
    <i class="ph-bold ph-twitter-logo"></i>
      <a href="https://twitter.com/${data.twitter_username}" target="_blank">
        <p>${data.twitter_username}</p>
      </a>
    ` : `
    <i class="ph-bold ph-twitter-logo disabled"></i>
    <p class="disabled">not available</p>
    `
    github.innerHTML = `
    <i class="ph-bold ph-link"></i>
    <a href="${data.html_url}" target="_blank">
      <p>${data.login}</p>	
    </a>
    `
    company.innerHTML = data.company ? `
    <i class="ph-bold ph-buildings"></i>
    <p>${data.company}</p>
    ` : `
    <i class="ph-bold ph-buildings disabled"></i>
    <p class="disabled">not available</p>  
  `
}

async function firstLoad() {
  try {
    const res = await fetch('https://api.github.com/users/hxsggsz')
    const data = await res.json()
    setUser(data)
  } catch (er) {
    console.error(er)
  }
}
firstLoad()

async function getUser(user) {
  try {
    const res = await fetch(`https://api.github.com/users/${user === '' ? defaultUser : user}`)
    const data = await res.json()
    setUser(data)
  } catch (er) {
    console.error(er)
  }
}

form.addEventListener('submit', async (ev) => {
  ev.preventDefault()
  await getUser(input.value)
})
