import * as React from 'react';
import './hamburger.scss';

export interface HamburgerProps { }

export interface HamburgerState {
  isActive: boolean;
}

export class Hamburger extends React.Component<HamburgerProps, HamburgerState> {
  constructor(props: HamburgerProps, context?: any) {
    super(props, context);
    this.state = {
      isActive: false
    };
  }

  public render() {
    return (
      <div onClick={() => this.setState({ isActive: !this.state.isActive })} className="hamburger-container">
        <a href="#" className="menu-button">
          <svg
            className={'menu-icon' + (this.state.isActive ? ' is-active' : '')}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <g fill="none" fillRule="evenodd" stroke="#979797">
              <path d="M13,26.5 L88,26.5" />
              <path d="M13,50.5 L88,50.5" />
              <path d="M13,50.5 L88,50.5" />
              <path d="M13,74.5 L88,74.5" />
            </g>
          </svg>
        </a>
        {this.state.isActive ? this.renderMenu() : null}
      </div>
    );
  }

  private renderMenu(): JSX.Element {
    return (
      <div className="menu-container">
        <div onClick={() => alert('nothing here')} className="entry">Entry 1 </div>
        <div onClick={() => alert('nothing here')} className="entry">Entry 2 </div>
        <div onClick={() => alert('nothing here')} className="entry">Entry 3 </div>
      </div>
    );
  }
}
