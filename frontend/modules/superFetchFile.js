import 'whatwg-fetch'

const handleErrors = res => {
  const json = res.json()

  if (!res.ok) {
    return json.then(err => {
      throw Error(err.message)
    })
  }
  return json
}

const superFetchFile = req => {
  let reqUrl = req.url
  const custom = req.custom || {}
  const reqObj = Object.assign({}, custom, { method: req.type })

  if ((req.type === "GET" || req.type === "DELETE") && req.data) {
    reqUrl += `${req.data}/`
  }
  if (req.type === "POST") {
    reqObj.headers = reqObj.headers || {}
    reqObj.headers["Access-Control-Allow-Origin"] = "*"
    reqObj.headers["charset"]="UTF-8"
    reqObj.mode = "same-origin"
    reqObj.body = req.data
  }
  console.log(reqObj)
  return fetch(reqUrl, reqObj)
    .then(handleErrors)
    .then(payload => ({ payload }))
    .catch(err => ({ err }))
}

export default superFetchFile
