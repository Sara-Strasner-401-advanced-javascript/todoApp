import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import { AppSettingsContext } from '../context/settings/context';
import useAjaxCalls from './hooks/ajax';

function TodoList(props) {
  const [URL, list, setList, addItem] = useAjaxCalls();
  const appSettingsContext = useContext(AppSettingsContext);
  const [currentPage, setCurrentPage] = useState(0);

  const page = props.list.slice(
    appSettingsContext.itemsPerScreen * currentPage,
    appSettingsContext.itemsPerScreen * (currentPage + 1)
  );

  const updateSortMethod = e => {
    e.preventDefault();
    appSettingsContext.setDefaultSort(e.target.value);
  };

  const updateCompleted = e => {
    appSettingsContext.setCompleted(e.target.value);
    //TO DO: if props.list.complete is true, hide that item
  };

  const radioSubmit = e => {
    e.preventDefault();
    renderSortMethod();
  };

  const renderSortMethod = e => {
    if (appSettingsContext.defaultSortField === 'difficulty') {
      let result = props.list.sort((a, b) =>
        a.difficulty > b.difficulty ? 1 : -1
      );
      setList([result]);
    } else if (appSettingsContext.defaultSortField === 'assignee') {
      let result = props.list.sort((a, b) =>
        a.assignee > b.assignee ? 1 : -1
      );
      setList([result]);
    } else if (appSettingsContext.defaultSortField === 'status') {
      let result = props.list.sort((a, b) =>
        a.complete > b.complete ? 1 : -1
      );
      setList([result]);
    }
  };

  const nextPage = e => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = e => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <form onSubmit={radioSubmit}>
        <label for="sort">Choose a sort method:</label>
        <input type="radio" onClick={updateSortMethod} value="difficulty" />
        Difficulty
        <input type="radio" onClick={updateSortMethod} value="assignee" />
        Assignee
        <input type="radio" onClick={updateSortMethod} value="status" />
        Status
        <button type="submit">Sort</button>
      </form>
      <div>
        <button onClick={updateCompleted} value="false">
          Hide completed items
        </button>
      </div>

      {page.map(item => (
        <Modal.Dialog>
          <Modal.Header
            closeButton
            onClick={() => props.handleDelete(item._id)}
          >
            <Modal.Title>
              {item.complete ? (
                <Badge pill variant="success">
                  Complete
                </Badge>
              ) : (
                <Badge pill variant="danger">
                  Pending
                </Badge>
              )}
              {item.assignee}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => props.handleComplete(item._id)}>
              {item.text} difficulty: {item.difficulty}
            </span>
          </Modal.Body>
        </Modal.Dialog>
      ))}
      {currentPage > 0 ? (
        <button onClick={previousPage}>Previous Page</button>
      ) : null}
      {props.list.length > (currentPage + 1) * 3 ? (
        <button onClick={nextPage}>Next Page</button>
      ) : null}
    </div>
  );
}

export default TodoList;
