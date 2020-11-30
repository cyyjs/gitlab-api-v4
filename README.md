## gitlab api v4

### Install

```
yarn add gitlab-api-v4
```
### Usage

```js
const Gitlab = require('gitlab-api-v4');

const gitlab = new Gitlab({
  api: 'https://gitlab.com/api/v4',
  privateToken: 'your private token'
});

gitlab.projects.list().then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})
```

