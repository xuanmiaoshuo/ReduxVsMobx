import React, { Component } from 'react'
import {
  createStore,
  bindActionCreators
} from 'redux'
import { Provider, connect } from 'react-redux'

// ①action types
const COUNTER_ADD = 'counter_add'
const COUNTER_DEC = 'counter_dec'
const COUNTER_DOUBLE = 'counter_double'

const initialState = { a: 0 }

// ②reducers
function reducers(state = initialState, action) {
  switch (action.type) {
    case COUNTER_ADD:
      return { ...state, a: state.a + 1 }
    case COUNTER_DEC:
      return { ...state, a: state.a - 1 }
    case COUNTER_DOUBLE:
      return { ...state, a: state.a * 2 }
    default:
      return state
  }
}

// ③action creator
const incA = () => ({ type: COUNTER_ADD })
const decA = () => ({ type: COUNTER_DEC })
const double = () => ({ type: COUNTER_DOUBLE })
const Actions = { incA, decA, double}

class Demo extends Component {
  render() {
    const { store, actions } = this.props
    return (
      <div>
        <p>a = {store.a}</p>
        <p>
          <button className="ui-btn" onClick={actions.incA}>增加 a</button>
          <button className="ui-btn" onClick={actions.decA}>减少 a</button>
          <button className="ui-btn" onClick={actions.double}>加倍 a</button>
        </p>
      </div>
    )
  }
}

// ④将state、actions 映射到组件 props
const mapStateToProps = state => ({ store: state })
const mapDispatchToProps = dispatch => ({
  // ⑤bindActionCreators 简化 dispatch
  actions: bindActionCreators(Actions, dispatch)
})
// ⑥connect产生容器组件
const Root = connect(
  mapStateToProps,
  mapDispatchToProps
)(Demo)

const store = createStore(reducers)
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}
