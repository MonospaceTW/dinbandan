import React, { Component } from "react";
import styled, { keyframes, css } from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const Button = styled.button`
  background: ${props => (props.primary ? "palevioletred" : "white")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border 2px solid palevioletred;
  border-radius: 3px;
`;

const Link = ({ className, children }) => {
  return <a className={className}>{children}</a>;
};

const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: blod;
`;

const ButtonExt = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const TomatoButton = ButtonExt.extend`
  color: tomato;
  border-color: tomato;
`;

const NewLink = ButtonExt.withComponent("a");
const TomatoNewLink = NewLink.extend`
  color: tomato;
  border-color: tomato;
`;

const NewInput = styled.input.attrs({
  type: "password",
  margin: props => props.size || "1em",
  padding: props => props.size || "1em"
})`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

const ThemeButton = styled.button`
  color: ${props => props.theme.fg};
  border: 2px solid ${props => props.theme.fg};
  background: ${props => props.theme.bg};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

const theme = {
  fg: "palevioletred",
  bg: "white"
};

const userInput = "/api/withdraw-funds";
const ArbitraryComponent = styled.div`
  background: url(${userInput});
`;

const RefInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const MediaTemplate = styled.div`
  background: papayawhip;
  height: 3em;
  width: 3em;
  @media (max-width: 700px) {
    background-color: palevioletred;
  }
`;

class MyComponent extends React.Component {
  render() {
    // Attach the passed-in className to the DOM node
    return <div className={this.props.className} />;
  }
}

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 376
};

const meidaquery = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

const Content = styled.div`
  height: 3em;
  width: 3em;
  background: papayawhip;

  /* Now we have our methods on media and can use them instead of raw queries */
  ${meidaquery.desktop`background: dodgerblue;`}
  ${meidaquery.tablet`background: mediumseagreen;`}
  ${meidaquery.phone`background: palevioletred;`}
`;

export default class App extends Component {
  render() {
    return (
      <div>
        <Wrapper>
          <Title>Hello World, this is my first styled component!</Title>
          <Input placeholder="@mxstbr" type="text" />
          <Input value="@geelen" type="text" />
        </Wrapper>
        <Button>Normal</Button>
        <Button primary>Primary</Button>
        <br />
        <Link>Unstyled, boring Link</Link>
        <br />
        <StyledLink>Styled, exciting Link</StyledLink>
        <div>
          <Button>Normal Button</Button>
          <TomatoButton>Tomato Button</TomatoButton>
        </div>
        <div>
          <NewLink>Normal Link</NewLink>
          <TomatoNewLink>TomatoNew Link</TomatoNewLink>
        </div>

        <div>
          <NewInput placeholder="A small text input" size="1em" />
          <br />
          <NewInput placeholder="A bigger text input" size="2em" />
        </div>
        <div>
          <Rotate>&lt; 💅 &gt;</Rotate>
        </div>
        <div>
          <RefInput
            placeholder="Hover here..."
            innerRef={x => {
              this.input = x;
            }}
            onMouseEnter={() => this.input.focus()}
            onMouseLeave={() => this.input.blur()}
          />
        </div>
        <div>
          <ArbitraryComponent>ArbitraryComponent</ArbitraryComponent>
        </div>
        <div>
          <MyComponent className="red-bg">sadfasfs</MyComponent>
        </div>

        <div>
          <MediaTemplate />
        </div>
        <div>
          <Content />
        </div>
      </div>
    );
  }
}
