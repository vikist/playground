import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { TodoActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { TodoModel } from 'app/models';
import { omit } from 'app/utils';
import { Header, Footer } from 'app/components';
import { Introduction } from 'app/components/Introduction';

const FILTER_VALUES = (Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map(
  (key) => TodoModel.Filter[key]
);

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    todos: RootState.TodoState;
    actions: TodoActions;
    filter: TodoModel.Filter;
  }
}

@connect(
  (state: RootState): Pick<App.Props, 'todos' | 'filter'> => {
    const hash = state.router.location && state.router.location.hash.replace('#', '');
    const filter = FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL;
    return { todos: state.todos, filter };
  },
  (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props> {
  static defaultProps: Partial<App.Props> = {
    filter: TodoModel.Filter.SHOW_ALL
  };

  constructor(props: App.Props, context?: any) {
    super(props, context);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text: string) {
    if (text.length) {
      this.props.actions.addTodo({ text });
    }
  }

  handleClearCompleted(): void {
    const hasCompletedTodo = this.props.todos.some((todo) => todo.completed || false);
    if (hasCompletedTodo) {
      this.props.actions.clearCompleted();
    }
  }

  handleFilterChange(filter: TodoModel.Filter): void {
    this.props.history.push(`#${filter}`);
  }

  render() {
    const { todos, filter } = this.props;
    const activeCount = todos.length - todos.filter((todo) => todo.completed).length;
    const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

    return (
      <div className={style.normal}>
        <Header />

        <Introduction/>
        
        {/* <TodoTextInput newTodo onSave={this.handleSave} placeholder="What needs to be done?" /> */}
        {/* <TodoList todos={filteredTodos} actions={actions} /> */}

        <Footer
          filter={filter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClickClearCompleted={this.handleClearCompleted}
          onClickFilter={this.handleFilterChange}
        />
      </div>
    );
  }
}
