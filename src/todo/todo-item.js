import React, {useContext} from "react";
import PropTypes from 'prop-types';
import Context from '../context.js';

const styles = {
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.5rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '.5rem',
  },
  input: {
    marginRight: '1rem',
  }
}

function TodoItem({todo, index, onChange}) {
  const {removeTodo} = useContext(Context);

  const classes =[];
  if (todo.completed) {
    classes.push('done');
  }

  return (
  <li style={styles.li}>
    <span className={classes.join('')}>
      <input type="checkbox" style={styles.input} onChange={() => onChange(todo.id)} checked={todo.completed}></input>
      <strong>{index + 1}</strong>
      &nbsp;
      {todo.title}
    </span>
    
    <button className='rm' onClick={removeTodo.bind(null, todo.id)}>&times;</button>
  </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

export default TodoItem;
