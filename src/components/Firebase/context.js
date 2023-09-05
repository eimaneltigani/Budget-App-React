import React from 'react';

//createContext() functions allows us to pass information without passing props for components to read
const FirebaseContext = React.createContext(null);

//create higher order component to wrap components to receive firebase prop
export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;