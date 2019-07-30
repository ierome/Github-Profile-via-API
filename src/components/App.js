import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'normalize.css/normalize.css'
import '../styles/App.css'
import moment from 'moment'

function App() {
  const [image, setImage] = useState('')
  const [login, setLogin] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [website, setWebsite] = useState('')
  const [repo, setRepo] = useState([])
  const [repoCount, setRepoCount] = useState(0)
  const [projectCount, setProjectCount] = useState(0)
  const [followerCount, setFollowerCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)


  useEffect(() => {
    axios.get('https://api.github.com/users/ierome').then(resp => {
      setImage(resp.data.avatar_url)
      setLogin(resp.data.login)
      setName(resp.data.name)
      setBio(resp.data.bio)
      setLocation(resp.data.location)
      setWebsite(resp.data.blog)
      setRepoCount(resp.data.public_repos)
      setProjectCount(resp.data.public_gists)
      setFollowerCount(resp.data.followers)
      setFollowingCount(resp.data.following)
    })
    axios.get('https://api.github.com/users/ierome/repos').then(resp => {
      setRepo(resp.data)
    })
  }, [])

  function getLanguage(str) {
    console.log(str)
    if (str === null) {
      return "hide"
    }
    if (str.includes('JavaScript')) {
      return "javascript"
    }
    if (str.includes('HTML')) {
      return "html"
    }
    if (str.includes('CSS')) {
      return "css"
    }
  }
    return (
      <div id="mainWrapper">
        <div id="userProfile">
          <img src={image} alt=""></img>
          <h1>{name}</h1>
          <p>{login}</p>
          <button className="edit">Edit Profile</button>
          <p>{bio}</p>
          <p><svg className="octicon octicon-location" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fillRule="evenodd" d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg> {location}</p>
          <p>
          <svg className="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg> {website}
          </p>
        </div>
        <div id="repos">
          <div id="nav">
            <li>Overview</li>
            <li>Repositories <span className="counts">{repoCount}</span></li>
            <li>Projects <span className="counts">{projectCount}</span></li>
            <li>Stars <span className="counts">0</span></li>
            <li>Followers <span className="counts">{followerCount}</span></li>
            <li>Following <span className="counts">{followingCount}</span></li>
          </div>
          {repo.reverse().map((item, i) => {
            return(
              <div id="repoWrap" key={i}>
            <div id="repo">
            <a href={item.html_url}><h3>{item.name}</h3></a>
            <p>{item.description}</p>
            <p className="repoDescription"><span className={"repo-language-color " + getLanguage(item.language)}></span> {item.language} Updated: {moment(item.updated_at).fromNow()}</p>
            </div>
            <div id="star">
            <button>&#x2605; Star</button>
            </div>
            </div>
            )})}
        </div>
      </div>
    )
}

export default App