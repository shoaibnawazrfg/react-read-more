import React from 'react';

export default class ReadMore extends React.Component {
  constructor({ initialHeight }) {
    super();
    this.state = { initialHeight, maxHeight: initialHeight };
  }

  toggle() {
    let { maxHeight, initialHeight } = this.state;

    //if expanded, close it
    if (maxHeight !== initialHeight)
      return this.setState({ maxHeight: initialHeight });

    let height = this.calculateHeight();

    //set the full height
    this.setState({ maxHeight: height });
  }

  calculateHeight() {
    //calculate height of all the children
    let children = [...this.container.children];
    let height = 0;
    children.forEach(child => (height += child.offsetHeight));

    return height;
  }

  componentDidMount() {
    if (this.calculateHeight() <= this.props.initialHeight)
      this.setState({ hideReadMore: true });
  }

  render() {
    let { children, readMore } = this.props;
    let { maxHeight, initialHeight, hideReadMore } = this.state;
    let open = maxHeight !== initialHeight;

    return (
      <React.Fragment>
        <div
          style={{
            maxHeight: open ? maxHeight : maxHeight - 160,
            transition: 'max-height .5s ease',
            position: 'relative',
            overflow: 'hidden',
            marginTop: 40,
          }}
          ref={el => (this.container = el)}
        >
          {children}
          {hideReadMore ? null : (
            <div
              style={{
                transition: 'opacity 0.25s',
                opacity: open ? 0 : 1,
                backgroundImage:
                  'linear-gradient(to bottom, rgba(255, 255, 255, 0.44), #ffffff )',
                content: '',
                height: '160px',
                width: '100%',
                position: 'absolute',
                bottom: '0',
                left: '0',
              }}
            />
          )}
        </div>

        {hideReadMore
          ? null
          : readMore({
              open,
              onClick: () => this.toggle(),
            })}
      </React.Fragment>
    );
  }
}
