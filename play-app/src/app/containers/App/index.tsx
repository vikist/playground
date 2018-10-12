import * as React from 'react';
import * as style from './style.css';
import { RouteComponentProps } from 'react-router';
import { Header, Footer } from 'app/components';
import { Introduction } from 'app/components/Introduction';
import { Lazy } from 'app/components/LazyList/Lazy';
import LazyLoad from 'react-lazyload';

export interface Props extends RouteComponentProps<void> { }

export class App extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
  };

  constructor(props: Props, context?: any) {
    super(props, context);
  }

  public render() {
    return (
      <div className={style.normal}>
        <Header />

        <Introduction />

        <LazyLoad height={800}>
          <Lazy />
        </LazyLoad>
        <Footer />
      </div>
    );
  }
}
