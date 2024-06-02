import Header from "../components/Header/Header";

const Base = (props) => (
  <>
    <div className="container">
      {props.children}
    </div>
      <Header />
  </>
)

export default Base;