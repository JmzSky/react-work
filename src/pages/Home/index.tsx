import { userState } from '@/models'
import { useSnapshot } from '@umijs/max'
import styles from './index.less'

const HomePage: React.FC = () => {
  const { name } = useSnapshot(userState).user
  return (
    <div className={styles.container}>
      <div style={{ textAlign: 'center', fontSize: 28 }}>欢迎使用 {name}</div>
    </div>
  )
}

export default HomePage
