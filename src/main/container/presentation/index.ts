import authentication from './authentication'
import main from './main'
import pets from './pets'
import users from './users'

export default { ...main, ...users, ...authentication, ...pets }
