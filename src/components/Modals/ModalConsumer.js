import React from 'react';
import { Consumer } from './ModalProvider';

export default Component => (
  class ModalConsumer extends Component {
    render() {
      return (
        <Consumer>
          {value => (
            <Component 
              {...value}
              {...this.props}
            />
          )}
        </Consumer>
      );
    }
  }
);