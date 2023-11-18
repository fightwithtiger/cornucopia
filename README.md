# cornucopia

<a href="https://marketplace.visualstudio.com/items?itemName=cornucopia" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/v/cornucopia.svg?color=eee&amp;label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="Visual Studio Marketplace Version" /></a>


## Usage
Ctrl + P

cor.genStyleFile

input
```jsx
import React, { PropsWithChildren } from 'react'
import styles from './index.module.scss'
import globals from '../global.module.scss'

interface Props { }

const Comp: React.FC<PropsWithChildren<Props>> = (props) => {

  const getContent = () => {

    return (
      <>
        <div className={styles.list}></div>
        <div className={styles.operation}>
          <div>
            <div className={globals.yellow}></div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={globals.red}>
          <span className={styles.tip}>
            <p className={globals.text}></p>
          </span>
        </div>
        <>
          {
            Math.random() < 0.5 ? (
              <div className={styles.left}></div>
            ): Math.random() < 0.2 ? (
              <div className={globals.left2}>
                <div className={styles.aa}>
                  <div className={globals.purple}></div>
                </div>
              </div>
            ): <div className={globals.blue}></div>
          }
          <div className={styles.right}>
            <div className={globals.green}>
            </div>
          </div>
        </>
      </div>
      <div className={styles.content}></div>
      <div className={styles.footer}></div>
    </div>
  )
}

export default Comp

```

output
```scss
index.module.scss
.list {
}

.operation {
}

.container {
  .header {
    .tip {
    }

    .left {
    }

    .aa {
    }

    .right {
    }
  }

  .content {
  }

  .footer {
  }
} 

global.module.scss
.yellow {
}

.red {
  .text {
  }
}

.left2 {
  .purple {
  }
}

.blue {
}

.green {
} 

```

## License

[MIT](./LICENSE) License © 2022 [fightwithtiger](https://github.com/fightwithtiger)
